package com.example.file_parser.service;

import java.io.File;
import java.nio.file.Files;
import java.util.ArrayList;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.file_parser.analyzer.AnalyzerFactory;
import com.example.file_parser.analyzer.CodeAnalyzer;
import com.example.file_parser.dto.FileAnalysisDTO;
import com.example.file_parser.dto.ProjectDTO;
import com.example.file_parser.util.FileUtils;

@Service
public class AnalyzeService {

    private final AnalyzerFactory factory;

    public AnalyzeService(AnalyzerFactory factory) {
        this.factory = factory;
    }

    public Object analyze(MultipartFile file) throws Exception {

        File temp = FileUtils.convertToFile(file);

        if (temp.getName().endsWith(".zip")) {
            File extractedFolder = FileUtils.unzip(temp);
            return analyzeFolder(extractedFolder);
        }

        CodeAnalyzer analyzer = factory.getAnalyzer(temp.getName());
        return analyzer.analyzeFile(temp);
    }


    private ProjectDTO analyzeFolder(File root) throws Exception {

        ProjectDTO project = new ProjectDTO();
        project.classes = new ArrayList<>();
        project.totalFiles = 0;

        Files.walk(root.toPath())
                .filter(Files::isRegularFile)
                .forEach(path -> {
                    try {
                        String fileName = path.getFileName().toString();

                        CodeAnalyzer analyzer =
                                factory.getAnalyzer(fileName);

                        FileAnalysisDTO result =
                                analyzer.analyzeFile(path.toFile());

                        project.classes.addAll(result.classes);
                        project.totalFiles++;

                    } catch (Exception e) {
                        System.out.println("Skipping file: " + path.getFileName());
                    }
                    
                    
					

                    

                    

                });
        
        


        return project;
    }
}

