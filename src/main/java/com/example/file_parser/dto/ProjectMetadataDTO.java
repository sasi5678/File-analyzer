package com.example.file_parser.dto;

import java.util.ArrayList;
import java.util.List;

public class ProjectMetadataDTO {
    public int totalFiles;
    public int totalLines;
    public List<FileMetadataDTO> files = new ArrayList<>();
}