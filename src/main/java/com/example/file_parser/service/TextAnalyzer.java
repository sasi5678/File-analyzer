package com.example.file_parser.service;

import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.file_parser.dto.FileMetadataDTO;

@Service
public class TextAnalyzer {

    public static FileMetadataDTO analyze(Path file) throws Exception {
        List<String> lines = Files.readAllLines(file);

        FileMetadataDTO dto = new FileMetadataDTO();
        dto.fileName = file.getFileName().toString();
        dto.totalLines = lines.size();
        dto.size = Files.size(file);

        return dto;
    }
}
