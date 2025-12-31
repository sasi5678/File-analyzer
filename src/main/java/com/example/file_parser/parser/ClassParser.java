package com.example.file_parser.parser;

import java.util.ArrayList;
import java.util.List;

import com.example.file_parser.dto.ClassDTO;

public class ClassParser {

    public static List<ClassDTO> extractClasses(List<String> lines) {

        List<ClassDTO> classes = new ArrayList<>();
        ClassDTO current = null;
        int startLine = 0;
        
        if(lines == null || lines.isEmpty()) return classes;

        for (int i = 0; i < lines.size(); i++) {
            String line = lines.get(i);
            int braceCount = 0;

            if (line.contains("class ")) {
                current = new ClassDTO();
                current.className = line.split("class ")[1].split("\\s")[0];
                startLine = i;
                braceCount = 0;
            }

            if (current != null) {
                if (line.contains("{")) braceCount++;
                if (line.contains("}")) braceCount--;

                if (braceCount == 0) {
                    current.totalLines = i - startLine + 1;
                    classes.add(current);
                    current = null;
                }
            }
        }
        return classes;
    }
}
