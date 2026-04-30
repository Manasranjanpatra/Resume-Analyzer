package com.resumeanalyzer.resumeanalyzer.dto;

import lombok.Builder;
import lombok.Data;
import java.util.List;

@Data
@Builder
public class AnalysisResponse {
    private List<String> skills;
    private List<String> strengths;
    private List<String> weaknesses;
    private List<String> suggestions;
    private String rawText;
}
