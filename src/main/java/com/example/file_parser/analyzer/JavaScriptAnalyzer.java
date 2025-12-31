package com.example.file_parser.analyzer;

import java.io.File;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import com.example.file_parser.dto.ClassDTO;
import com.example.file_parser.dto.FileAnalysisDTO;
import com.example.file_parser.dto.MethodDTO;
import com.example.file_parser.dto.ProjectDTO;
import com.example.file_parser.parser.ComplexityAnalyzer;
import com.example.file_parser.parser.LoopDetector;

@Component
public  class JavaScriptAnalyzer implements CodeAnalyzer {

    @Override
    public boolean supports(String name) {
        return name.endsWith(".js");
    }

    @Override
    public FileAnalysisDTO analyzeFile(File file) throws Exception {

        List<String> lines = Files.readAllLines(file.toPath());

        FileAnalysisDTO dto = new FileAnalysisDTO();
        dto.fileName = file.getName();
        
        if(lines == null || lines.isEmpty()) return dto;
        
        
        dto.totalLines = lines.size();

        dto.imports = lines.stream()
                .filter(l -> l.contains("import") || l.contains("require"))
                .toList();

        ClassDTO cls = new ClassDTO();
        cls.className = file.getName();
        cls.methods = extractFunctions(lines);
        cls.totalLines = lines.size();

        dto.classes = List.of(cls);
        return dto;
    }

    private List<MethodDTO> extractFunctions(List<String> lines) {

        List<MethodDTO> methods = new ArrayList<>();

        
        for (int i = 0; i < lines.size(); i++) {
            String l = lines.get(i);

            if (l.contains("function") || l.contains("=>")) {

                MethodDTO m = new MethodDTO();
                m.methodName = l.trim();

                // JS functions usually end at next "}"
                int end = lines.size() - 1;

                m.loops = LoopDetector.detectLoops(lines, i, end);
                m.timeComplexity = ComplexityAnalyzer.analyze(m.loops);

                methods.add(m);
            }
        }
        return methods;
    }

	@Override
	public ProjectDTO analyzeProject(File folder) throws Exception {
		return null;
	}

}
