package com.resumeanalyzer.resumeanalyzer.dto;

import lombok.Data;

@Data
public class SkillGapRequest {
    private String resumeText;
    private String jobDescription;
}
