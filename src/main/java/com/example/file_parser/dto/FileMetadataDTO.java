package com.example.file_parser.dto;

import java.util.ArrayList;
import java.util.List;

public class FileMetadataDTO {
    public String fileName;
    public String language;
    public long size;
    public int totalLines;
    public int commentLines;
    public int linesOfCode;

    public List<String> imports = new ArrayList<>();
    public List<ClassDTO> classes = new ArrayList<>();
    public List<MethodDTO> methods = new ArrayList<>();
    public List<ApiDTO> apis = new ArrayList<>();
}
