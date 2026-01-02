package com.example.file_parser.service;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.file_parser.dto.FileMetadataDTO;
import com.example.file_parser.dto.ProjectMetadataDTO;

@Service
public class AnalyzeService {

    private final ZipService zipService;
    private final LanguageRouter router;

    public AnalyzeService(ZipService zipService, LanguageRouter router) {
        this.zipService = zipService;
        this.router = router;
    }

    public ProjectMetadataDTO process(MultipartFile file) throws Exception {

        List<Path> files;

        if (file.getOriginalFilename().endsWith(".zip")) {
            files = zipService.extractZip(file);
        } else {
            Path temp = Files.createTempFile("single-", file.getOriginalFilename());
            Files.copy(file.getInputStream(), temp, StandardCopyOption.REPLACE_EXISTING);
            files = List.of(temp);
        }

        ProjectMetadataDTO project = new ProjectMetadataDTO();

        for (Path path : files) {
            FileMetadataDTO metadata = router.analyze(path);
            if (metadata != null) {
                project.files.add(metadata);
                project.totalFiles++;
                project.totalLines += metadata.totalLines;
            }
        }

        return project;
    }
}
