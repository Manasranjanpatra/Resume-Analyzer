package com.resumeanalyzer.resumeanalyzer.controller;

import com.resumeanalyzer.resumeanalyzer.dto.AnalysisResponse;
import com.resumeanalyzer.resumeanalyzer.dto.ATSScoreResponse;
import com.resumeanalyzer.resumeanalyzer.dto.SkillGapRequest;
import com.resumeanalyzer.resumeanalyzer.dto.SkillGapResponse;
import com.resumeanalyzer.resumeanalyzer.service.FileParserService;
import com.resumeanalyzer.resumeanalyzer.service.ResumeAnalysisService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@RequestMapping("/api/resume")
@RequiredArgsConstructor
public class ResumeController {

    private final FileParserService fileParserService;
    private final ResumeAnalysisService resumeAnalysisService;

    @PostMapping("/upload")
    public ResponseEntity<Map<String, String>> upload(@RequestParam("file") MultipartFile file) throws Exception {
        if (file.isEmpty()) return ResponseEntity.badRequest().body(Map.of("error", "File is empty"));
        String text = fileParserService.extractText(file);
        return ResponseEntity.ok(Map.of("text", text, "filename", file.getOriginalFilename()));
    }

    @PostMapping("/analyze")
    public ResponseEntity<AnalysisResponse> analyze(@RequestBody Map<String, String> body) {
        String resumeText = body.get("resumeText");
        if (resumeText == null || resumeText.isBlank())
            return ResponseEntity.badRequest().build();
        return ResponseEntity.ok(resumeAnalysisService.analyzeResume(resumeText));
    }

    @PostMapping("/score")
    public ResponseEntity<ATSScoreResponse> score(@RequestBody Map<String, String> body) {
        String resumeText = body.get("resumeText");
        if (resumeText == null || resumeText.isBlank())
            return ResponseEntity.badRequest().build();
        return ResponseEntity.ok(resumeAnalysisService.scoreResume(resumeText));
    }

    @PostMapping("/skill-gap")
    public ResponseEntity<SkillGapResponse> skillGap(@RequestBody SkillGapRequest request) {
        if (request.getResumeText() == null || request.getJobDescription() == null)
            return ResponseEntity.badRequest().build();
        return ResponseEntity.ok(resumeAnalysisService.analyzeSkillGap(request.getResumeText(), request.getJobDescription()));
    }
    
}
