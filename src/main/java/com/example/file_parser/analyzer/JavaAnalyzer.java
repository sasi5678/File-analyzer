package com.example.file_parser.analyzer;

import java.io.File;
import java.nio.file.Files;
import java.util.List;

import org.springframework.stereotype.Component;

import com.example.file_parser.dto.FileAnalysisDTO;
import com.example.file_parser.dto.ProjectDTO;
import com.example.file_parser.parser.ClassParser;

@Component
public class JavaAnalyzer implements CodeAnalyzer {

    @Override
    public boolean supports(String name) {
        return name.endsWith(".java");
    }

    
    @Override
    public FileAnalysisDTO analyzeFile(File file) throws Exception {

        List<String> lines = Files.readAllLines(file.toPath());

        
        FileAnalysisDTO dto = new FileAnalysisDTO();
        dto.setFileName(file.getName());
        
        if(lines == null  || lines.isEmpty()) return dto;
        dto.setTotalLines(lines.size());

        int code = 0, comment = 0, blank = 0;

        for (String line : lines) {
            String t = line.trim();
            if (t.isEmpty()) blank++;
            else if (t.startsWith("//") || t.startsWith("/*")) comment++;
            else code++;
        }

        dto.setCodeLines(code);
        dto.setCommentLines(comment);
        dto.setBlankLines(blank);

        dto.setImports(
            lines.stream()
                 .filter(l -> l.startsWith("import"))
                 .toList()
        );

        dto.setClasses(ClassParser.extractClasses(lines));

        return dto;
    }


    @Override
    public ProjectDTO analyzeProject(File folder) {
        throw new UnsupportedOperationException();
    }
}
