package com.example.file_parser.analyzer;

import java.util.List;

import org.springframework.stereotype.Component;

@Component
public class AnalyzerFactory {

    private final List<CodeAnalyzer> analyzers;

    public AnalyzerFactory(List<CodeAnalyzer> analyzers) {
        this.analyzers = analyzers;
    }

    public CodeAnalyzer getAnalyzer(String filename) {
        return analyzers.stream()
                .filter(a -> a.supports(filename))
                .findFirst()
                .orElseThrow(null);
    }
}

