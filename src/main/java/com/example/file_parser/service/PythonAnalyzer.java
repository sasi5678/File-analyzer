package com.example.file_parser.service;

import java.nio.file.Path;

import org.springframework.stereotype.Service;

import com.example.file_parser.dto.FileMetadataDTO;

@Service
public class PythonAnalyzer {
    public FileMetadataDTO analyze(Path file) throws Exception {
        FileMetadataDTO dto = TextAnalyzer.analyze(file);
        dto.language = "Python";
        return dto;
    }
}
