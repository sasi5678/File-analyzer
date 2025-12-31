package com.example.file_parser.service;

import java.io.File;
import java.nio.file.Files;
import java.util.ArrayList;

import org.springframework.stereotype.Service;

import com.example.file_parser.analyzer.AnalyzerFactory;
import com.example.file_parser.analyzer.CodeAnalyzer;
import com.example.file_parser.dto.FileAnalysisDTO;
import com.example.file_parser.dto.ProjectDTO;

@Service
public class ProjectAnalyzer {


    private final AnalyzerFactory factory;

    public ProjectAnalyzer(AnalyzerFactory factory) {
        this.factory = factory;
    }
	
    private ProjectDTO analyzeFolder(File root) throws Exception {

        ProjectDTO project = new ProjectDTO();
        project.classes = new ArrayList<>();
        project.totalFiles = 0;
        project.totalLines = 0; // ✅ initialize

        Files.walk(root.toPath())
                .filter(Files::isRegularFile)
                .forEach(path -> {

                    project.totalFiles++; // ✅ count ALL files

                    try {
                        String fileName = path.getFileName().toString();

                        CodeAnalyzer analyzer =
                                factory.getAnalyzer(fileName);

                        if (analyzer == null) {
                            System.out.println("Skipped: " + fileName);
                            return;
                        }

                        FileAnalysisDTO result =
                                analyzer.analyzeFile(path.toFile());

                        if (result != null) {

                            if (result.getClasses() != null) {
                                project.classes.addAll(result.getClasses());
                            }

                            project.totalLines += result.getTotalLines();
                        }

                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                });

        return project;
    }


}
