package com.example.file_parser.parser;

import java.util.List;

public class ComplexityAnalyzer {
	
	public static String analyze(List<String> loops) {
        if (loops.isEmpty()) return "O(1)";
        if (loops.size() == 1) return "O(n)";
        if (loops.size() == 2) return "O(n²)";
        return "O(n³+)";
    }
}
