package com.example.file_parser.service;

import java.nio.file.Path;

import org.springframework.stereotype.Service;

import com.example.file_parser.dto.FileMetadataDTO;

@Service
public class LanguageRouter {

    private final JavaAnalyzer javaAnalyzer;
    private final JavaScriptAnalyzer jsAnalyzer;
    private final PythonAnalyzer pythonAnalyzer;
    private final TextAnalyzer textAnalyzer;

    public LanguageRouter(JavaAnalyzer j, JavaScriptAnalyzer js, PythonAnalyzer p, TextAnalyzer t) {
        this.javaAnalyzer = j;
        this.jsAnalyzer = js;
        this.pythonAnalyzer = p;
        this.textAnalyzer = t;
    }

    public FileMetadataDTO analyze(Path file) throws Exception {

        String name = file.toString().toLowerCase();

        if (name.endsWith(".java")) return javaAnalyzer.analyze(file);
        if (name.endsWith(".js")) return jsAnalyzer.analyze(file);
        if (name.endsWith(".py")) return pythonAnalyzer.analyze(file);
        if (name.endsWith(".txt") || name.endsWith(".html"))
            return textAnalyzer.analyze(file);

        return null;
    }
}
