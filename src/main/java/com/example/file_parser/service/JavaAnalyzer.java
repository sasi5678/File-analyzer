package com.example.file_parser.service;

import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.file_parser.dto.ApiDTO;
import com.example.file_parser.dto.ClassDTO;
import com.example.file_parser.dto.FileMetadataDTO;
import com.example.file_parser.dto.MethodDTO;

@Service
public class JavaAnalyzer {

    public FileMetadataDTO analyze(Path file) throws Exception {

        List<String> lines = Files.readAllLines(file);

        FileMetadataDTO dto = new FileMetadataDTO();
        dto.fileName = file.getFileName().toString();
        dto.size = Files.size(file);
        dto.totalLines = lines.size();

        int comments = 0;

        for (String line : lines) {
            if (line.trim().startsWith("//") || line.trim().startsWith("/*"))
                comments++;
        }

        dto.commentLines = comments;
        dto.linesOfCode = dto.totalLines - comments;

        // Detect imports
        lines.stream()
                .filter(l -> l.startsWith("import "))
                .forEach(l -> dto.imports.add(l.replace("import", "").replace(";", "").trim()));

        // Detect class
        for (int i = 0; i < lines.size(); i++) {
            if (lines.get(i).contains("class ")) {
                ClassDTO cls = new ClassDTO();
                cls.name = lines.get(i).split("class ")[1].split(" ")[0];
                cls.startLine = i + 1;
                dto.classes.add(cls);
            }
        }

        // Detect methods
        for (int i = 0; i < lines.size(); i++) {
            if (lines.get(i).matches(".*\\)\\s*\\{")) {
                MethodDTO m = new MethodDTO();
                m.name = lines.get(i).trim();
                m.startLine = i + 1;
                dto.methods.add(m);
            }
        }
        
        
        // Detect Spring APIs
        for (String line : lines) {

            
            if (line.contains("@GetMapping")
                || line.contains("@PostMapping")
                || line.contains("@PutMapping")
                || line.contains("@DeleteMapping")) {

                ApiDTO api = new ApiDTO();

                if (line.contains("GetMapping")) api.httpMethod = "GET";
                else if (line.contains("PostMapping")) api.httpMethod = "POST";
                else if (line.contains("PutMapping")) api.httpMethod = "PUT";
                else if (line.contains("DeleteMapping")) api.httpMethod = "DELETE";

                // VERY SIMPLE URL extraction
                if (line.contains("(")) {
                    api.apiUrl = line.substring(
                        line.indexOf("(") + 1,
                        line.indexOf(")")
                    ).replace("\"", "");
                }

                api.className = dto.fileName;

                dto.apis.add(api);
            }
        }


        return dto;
    }
}
