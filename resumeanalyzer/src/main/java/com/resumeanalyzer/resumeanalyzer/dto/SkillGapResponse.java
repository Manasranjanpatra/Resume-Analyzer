package com.resumeanalyzer.resumeanalyzer.dto;

import lombok.Builder;
import lombok.Data;
import java.util.List;

@Data
@Builder
public class SkillGapResponse {
    private List<String> matchingSkills;
    private List<String> missingSkills;
    private int matchPercentage;
    private List<String> suggestions;
    private String summary;
}
