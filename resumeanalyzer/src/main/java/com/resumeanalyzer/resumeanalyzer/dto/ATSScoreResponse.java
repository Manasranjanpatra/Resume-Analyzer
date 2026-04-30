package com.resumeanalyzer.resumeanalyzer.dto;

import lombok.Builder;
import lombok.Data;
import java.util.List;
import java.util.Map;

@Data
@Builder
public class ATSScoreResponse {
    private int overallScore;
    private int skillScore;
    private int keywordScore;
    private int experienceScore;
    private int formattingScore;
    private String scoreLabel; // GOOD, AVERAGE, POOR
    private List<String> foundKeywords;
    private List<String> missingKeywords;
    private Map<String, Integer> skillsBreakdown;
}
