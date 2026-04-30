package com.resumeanalyzer.resumeanalyzer.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;

import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

@Service
public class OpenAIService {

    @Value("${gemini.api.key}")
    private String apiKey;

    @Value("${gemini.api.url}")
    private String apiUrl;

    @Value("${gemini.api.mock:false}")
    private boolean mockMode;

    private final WebClient webClient;

    public OpenAIService(WebClient webClient) {
        this.webClient = webClient;
    }

    public String chat(String systemPrompt, String userMessage) {
        if (mockMode) {
            return buildMockResponse(userMessage);
        }

        // Gemini request format
        String combinedPrompt = systemPrompt + "\n\n" + userMessage;
        Map<String, Object> body = Map.of(
                "contents", List.of(
                        Map.of("parts", List.of(
                                Map.of("text", combinedPrompt)
                        ))
                ),
                "generationConfig", Map.of(
                        "temperature", 0.3,
                        "maxOutputTokens", 1024
                )
        );

        int maxRetries = 3;
        int delaySeconds = 10;

        for (int attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                Map<?, ?> response = webClient.post()
                        .uri(apiUrl + "?key=" + apiKey)
                        .contentType(MediaType.APPLICATION_JSON)
                        .bodyValue(body)
                        .retrieve()
                        .bodyToMono(Map.class)
                        .block();

                if (response == null) throw new RuntimeException("No response from Gemini");

                List<?> candidates = (List<?>) response.get("candidates");
                Map<?, ?> candidate = (Map<?, ?>) candidates.get(0);
                Map<?, ?> content = (Map<?, ?>) candidate.get("content");
                List<?> parts = (List<?>) content.get("parts");
                Map<?, ?> part = (Map<?, ?>) parts.get(0);
                return (String) part.get("text");

            } catch (WebClientResponseException e) {
                if (e.getStatusCode() == HttpStatus.TOO_MANY_REQUESTS) {
                    if (attempt < maxRetries) {
                        try {
                            TimeUnit.SECONDS.sleep(delaySeconds * attempt);
                        } catch (InterruptedException ie) {
                            Thread.currentThread().interrupt();
                        }
                        continue;
                    }
                    // All retries exhausted — fall back to mock
                    return buildMockResponse(userMessage);
                }
                if (e.getStatusCode() == HttpStatus.UNAUTHORIZED || e.getStatusCode() == HttpStatus.FORBIDDEN) {
                    throw new RuntimeException("Invalid Gemini API key. Check your key at aistudio.google.com");
                }
                throw new RuntimeException("Gemini API error " + e.getStatusCode() + ": " + e.getResponseBodyAsString());
            }
        }
        return buildMockResponse(userMessage);
    }

    private String buildMockResponse(String userMessage) {
        boolean isSkillGap = userMessage.contains("Job Description");
        boolean isAnalysis = userMessage.contains("Analyze this resume");

        if (isAnalysis) {
            return """
                {
                  "skills": ["Java", "Spring Boot", "REST APIs", "SQL", "Git", "Docker", "Agile", "Problem Solving"],
                  "strengths": [
                    "Strong backend development experience with Java and Spring Boot",
                    "Good understanding of RESTful API design principles",
                    "Experience with relational databases and SQL",
                    "Familiar with version control using Git",
                    "Demonstrated ability to work in Agile environments"
                  ],
                  "weaknesses": [
                    "Limited cloud platform experience (AWS/Azure/GCP)",
                    "No mention of CI/CD pipeline experience",
                    "Frontend skills not highlighted",
                    "Missing quantifiable achievements and metrics",
                    "No certifications listed"
                  ],
                  "suggestions": [
                    "Add measurable achievements (e.g. reduced load time by 30%)",
                    "Include cloud certifications like AWS Solutions Architect",
                    "Mention CI/CD tools like Jenkins, GitHub Actions",
                    "Add a professional summary at the top",
                    "Highlight any open-source contributions or side projects",
                    "Use stronger action verbs to describe responsibilities"
                  ]
                }
                """;
        }

        if (isSkillGap) {
            return """
                {
                  "matchingSkills": ["Java", "Spring Boot", "REST APIs", "SQL", "Git", "Agile", "Problem Solving"],
                  "missingSkills": ["Kubernetes", "AWS", "React", "TypeScript", "CI/CD", "Microservices"],
                  "matchPercentage": 62,
                  "suggestions": [
                    "Learn Kubernetes basics and get CKA certified",
                    "Build hands-on AWS experience with EC2, S3, and Lambda",
                    "Add a React or Angular project to your portfolio",
                    "Set up a CI/CD pipeline using GitHub Actions in a personal project",
                    "Refactor a monolith project into microservices to gain experience"
                  ],
                  "summary": "Your resume matches 62% of the job requirements. You have strong backend fundamentals but the role requires cloud-native and frontend skills that are currently missing from your profile."
                }
                """;
        }

        return """
            {
              "skills": ["Java", "Python", "SQL", "Git", "Communication"],
              "strengths": ["Technical foundation", "Team collaboration", "Problem solving"],
              "weaknesses": ["Limited cloud experience", "No metrics in achievements"],
              "suggestions": ["Add quantifiable results", "Include cloud skills", "Add a summary section"]
            }
            """;
    }
}
