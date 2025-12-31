package com.example.file_parser.controller;


import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.file_parser.service.AnalyzeService;



@RestController
@RequestMapping("/analyze")
@CrossOrigin
public class AnalyzeController {

    private final AnalyzeService analyzeService;

    public AnalyzeController(AnalyzeService analyzeService) {
        this.analyzeService = analyzeService;
    }

    @PostMapping
    public Object analyze(@RequestParam("file") MultipartFile file) throws Exception {
        return analyzeService.analyze(file);
    }
}

