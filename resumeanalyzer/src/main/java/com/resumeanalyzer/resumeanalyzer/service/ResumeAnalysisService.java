package com.resumeanalyzer.resumeanalyzer.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.resumeanalyzer.resumeanalyzer.dto.AnalysisResponse;
import com.resumeanalyzer.resumeanalyzer.dto.ATSScoreResponse;
import com.resumeanalyzer.resumeanalyzer.dto.SkillGapResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class ResumeAnalysisService {

    private final OpenAIService openAIService;
    private final ObjectMapper objectMapper = new ObjectMapper();

    private static final List<String> ATS_KEYWORDS = List.of(
            "java", "python", "javascript", "typescript", "react", "spring", "sql", "aws", "docker",
            "kubernetes", "git", "agile", "scrum", "rest", "api", "microservices", "ci/cd", "linux",
            "node", "angular", "vue", "mongodb", "postgresql", "redis", "kafka", "machine learning",
            "data analysis", "communication", "leadership", "problem solving", "teamwork"
    );

    public AnalysisResponse analyzeResume(String resumeText) {
        String systemPrompt = """
                You are an expert resume analyst. Analyze the resume and respond ONLY with valid JSON in this exact format:
                {
                  "skills": ["skill1", "skill2"],
                  "strengths": ["strength1", "strength2"],
                  "weaknesses": ["weakness1", "weakness2"],
                  "suggestions": ["suggestion1", "suggestion2"]
                }
                Provide 5-8 items per category. Be specific and actionable.
                """;

        String raw = openAIService.chat(systemPrompt, "Analyze this resume:\n\n" + truncate(resumeText, 1500));

        try {
            String json = extractJson(raw);
            Map<?, ?> parsed = objectMapper.readValue(json, Map.class);
            return AnalysisResponse.builder()
                    .skills(toStringList(parsed.get("skills")))
                    .strengths(toStringList(parsed.get("strengths")))
                    .weaknesses(toStringList(parsed.get("weaknesses")))
                    .suggestions(toStringList(parsed.get("suggestions")))
                    .rawText(resumeText)
                    .build();
        } catch (Exception e) {
            throw new RuntimeException("Failed to parse AI analysis response: " + e.getMessage());
        }
    }

    public ATSScoreResponse scoreResume(String resumeText) {
        String lowerText = resumeText.toLowerCase();
        List<String> found = new ArrayList<>();
        List<String> missing = new ArrayList<>();

        for (String keyword : ATS_KEYWORDS) {
            if (lowerText.contains(keyword)) found.add(keyword);
            else missing.add(keyword);
        }

        int keywordScore = (int) ((found.size() * 100.0) / ATS_KEYWORDS.size());
        int skillScore = Math.min(100, found.size() * 4);
        int experienceScore = calculateExperienceScore(lowerText);
        int formattingScore = calculateFormattingScore(resumeText);
        int overall = (keywordScore + skillScore + experienceScore + formattingScore) / 4;

        String label = overall >= 75 ? "GOOD" : overall >= 50 ? "AVERAGE" : "POOR";

        Map<String, Integer> breakdown = new LinkedHashMap<>();
        breakdown.put("Keywords", keywordScore);
        breakdown.put("Skills", skillScore);
        breakdown.put("Experience", experienceScore);
        breakdown.put("Formatting", formattingScore);

        return ATSScoreResponse.builder()
                .overallScore(overall)
                .skillScore(skillScore)
                .keywordScore(keywordScore)
                .experienceScore(experienceScore)
                .formattingScore(formattingScore)
                .scoreLabel(label)
                .foundKeywords(found)
                .missingKeywords(missing.subList(0, Math.min(10, missing.size())))
                .skillsBreakdown(breakdown)
                .build();
    }

    public SkillGapResponse analyzeSkillGap(String resumeText, String jobDescription) {
        String systemPrompt = """
                You are an expert career coach. Compare the resume with the job description and respond ONLY with valid JSON:
                {
                  "matchingSkills": ["skill1"],
                  "missingSkills": ["skill1"],
                  "matchPercentage": 75,
                  "suggestions": ["suggestion1"],
                  "summary": "brief summary"
                }
                Be specific and practical.
                """;

        String userMsg = "Resume:\n" + truncate(resumeText, 1000) + "\n\nJob Description:\n" + truncate(jobDescription, 800);
        String raw = openAIService.chat(systemPrompt, userMsg);

        try {
            String json = extractJson(raw);
            Map<?, ?> parsed = objectMapper.readValue(json, Map.class);
            return SkillGapResponse.builder()
                    .matchingSkills(toStringList(parsed.get("matchingSkills")))
                    .missingSkills(toStringList(parsed.get("missingSkills")))
                    .matchPercentage(((Number) parsed.get("matchPercentage")).intValue())
                    .suggestions(toStringList(parsed.get("suggestions")))
                    .summary((String) parsed.get("summary"))
                    .build();
        } catch (Exception e) {
            throw new RuntimeException("Failed to parse skill gap response: " + e.getMessage());
        }
    }

    private int calculateExperienceScore(String text) {
        int score = 50;
        if (text.contains("years of experience") || text.contains("yr experience")) score += 20;
        if (text.contains("senior") || text.contains("lead") || text.contains("manager")) score += 15;
        if (text.contains("bachelor") || text.contains("master") || text.contains("phd")) score += 15;
        return Math.min(100, score);
    }

    private int calculateFormattingScore(String text) {
        int score = 40;
        if (text.contains("@")) score += 15; // email present
        if (text.length() > 500) score += 15;
        if (text.contains("experience") || text.contains("education")) score += 15;
        if (text.contains("skills") || text.contains("projects")) score += 15;
        return Math.min(100, score);
    }

    private String extractJson(String text) {
        int start = text.indexOf('{');
        int end = text.lastIndexOf('}');
        if (start == -1 || end == -1) throw new RuntimeException("No JSON found in response");
        return text.substring(start, end + 1);
    }

    @SuppressWarnings("unchecked")
    private List<String> toStringList(Object obj) {
        if (obj instanceof List<?> list) {
            return (List<String>) list;
        }
        return List.of();
    }

    private String truncate(String text, int maxLen) {
        return text.length() > maxLen ? text.substring(0, maxLen) : text;
    }
}
