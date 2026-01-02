package com.example.file_parser.service;


import org.springframework.stereotype.Service;

import com.example.file_parser.dto.FileMetadataDTO;


import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;


import com.example.file_parser.dto.ApiDTO;
import com.example.file_parser.dto.ClassDTO;
import com.example.file_parser.dto.MethodDTO;

@Service
public class JavaScriptAnalyzer {

    public FileMetadataDTO analyze(Path file) throws Exception {

        List<String> lines = Files.readAllLines(file);

        FileMetadataDTO dto = new FileMetadataDTO();
        dto.fileName = file.getFileName().toString();
        dto.language = "JavaScript";
        dto.totalLines = lines.size();
        dto.size = Files.size(file);

        int commentLines = 0;

        // REGEX patterns
        Pattern functionPattern = Pattern.compile("function\\s+(\\w+)");
        Pattern arrowPattern = Pattern.compile("(\\w+)\\s*=\\s*\\(.*\\)\\s*=>");
        Pattern classPattern = Pattern.compile("class\\s+(\\w+)");
        Pattern importPattern = Pattern.compile("import\\s+.*from\\s+['\"](.+)['\"]");
        Pattern requirePattern = Pattern.compile("require\\(['\"](.+)['\"]\\)");

        Pattern expressGet = Pattern.compile("app\\.get\\(['\"](.+)['\"]");
        Pattern expressPost = Pattern.compile("app\\.post\\(['\"](.+)['\"]");

        Pattern fetchPattern = Pattern.compile("fetch\\(['\"](.+)['\"]");
        Pattern axiosPattern = Pattern.compile("axios\\.(get|post|put|delete)\\(['\"](.+)['\"]");

        for (int i = 0; i < lines.size(); i++) {
            String line = lines.get(i).trim();

            // Comments
            if (line.startsWith("//")) {
                commentLines++;
            }

            // Functions
            Matcher m1 = functionPattern.matcher(line);
            if (m1.find()) {
                MethodDTO m = new MethodDTO();
                m.name = m1.group(1);
                m.startLine = i + 1;
                dto.methods.add(m);
            }

            Matcher m2 = arrowPattern.matcher(line);
            if (m2.find()) {
                MethodDTO m = new MethodDTO();
                m.name = m2.group(1);
                m.startLine = i + 1;
                dto.methods.add(m);
            }

            // Classes
            Matcher c = classPattern.matcher(line);
            if (c.find()) {
                ClassDTO cls = new ClassDTO();
                cls.name = c.group(1);
                cls.startLine = i + 1;
                dto.classes.add(cls);
            }

            // Imports
            Matcher im = importPattern.matcher(line);
            if (im.find()) {
                dto.imports.add(im.group(1));
            }

            Matcher req = requirePattern.matcher(line);
            if (req.find()) {
                dto.imports.add(req.group(1));
            }

            // EXPRESS APIs (Backend)
            Matcher g = expressGet.matcher(line);
            if (g.find()) {
                ApiDTO api = new ApiDTO();
                api.httpMethod = "GET";
                api.apiUrl = g.group(1);
                api.className = "ExpressRoute";
                dto.apis.add(api);
            }

            Matcher p = expressPost.matcher(line);
            if (p.find()) {
                ApiDTO api = new ApiDTO();
                api.httpMethod = "POST";
                api.apiUrl = p.group(1);
                api.className = "ExpressRoute";
                dto.apis.add(api);
            }

            // FRONTEND APIs
            Matcher f = fetchPattern.matcher(line);
            if (f.find()) {
                ApiDTO api = new ApiDTO();
                api.httpMethod = "FETCH";
                api.apiUrl = f.group(1);
                api.className = "FrontendAPI";
                dto.apis.add(api);
            }

            Matcher ax = axiosPattern.matcher(line);
            if (ax.find()) {
                ApiDTO api = new ApiDTO();
                api.httpMethod = ax.group(1).toUpperCase();
                api.apiUrl = ax.group(2);
                api.className = "FrontendAPI";
                dto.apis.add(api);
            }
        }

        dto.commentLines = commentLines;
        dto.linesOfCode = dto.totalLines - commentLines;

        return dto;
    }
}
