package com.example.file_parser.analyzer;

import java.io.File;

import com.example.file_parser.dto.FileAnalysisDTO;
import com.example.file_parser.dto.ProjectDTO;

public interface CodeAnalyzer {

	
	boolean supports(String extension);

    FileAnalysisDTO analyzeFile(File file) throws Exception;

    ProjectDTO analyzeProject(File folder) throws Exception;
    
}
