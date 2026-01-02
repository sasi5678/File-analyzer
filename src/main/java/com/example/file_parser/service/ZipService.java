package com.example.file_parser.service;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class ZipService {

    public List<Path> extractZip(MultipartFile zip) throws Exception {

        List<Path> files = new ArrayList<>();
        Path root = Files.createTempDirectory("project");

        try (ZipInputStream zis = new ZipInputStream(zip.getInputStream())) {
            ZipEntry entry;

            while ((entry = zis.getNextEntry()) != null) {
                if (entry.isDirectory()) continue;

                Path file = root.resolve(entry.getName());
                Files.createDirectories(file.getParent());
                Files.copy(zis, file, StandardCopyOption.REPLACE_EXISTING);
                files.add(file);
            }
        }
        return files;
    }
}
