package com.resumeanalyzer.resumeanalyzer.service;

import org.apache.tika.Tika;
import org.apache.tika.exception.TikaException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Set;

@Service
public class FileParserService {

    private static final Set<String> ALLOWED_TYPES = Set.of(
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    );

    private final Tika tika = new Tika();

    public String extractText(MultipartFile file) throws IOException, TikaException {
        String detectedType = tika.detect(file.getInputStream());
        if (!ALLOWED_TYPES.contains(detectedType)) {
            throw new IllegalArgumentException("Unsupported file type: " + detectedType + ". Only PDF and DOC/DOCX are allowed.");
        }
        return tika.parseToString(file.getInputStream());
    }
}
