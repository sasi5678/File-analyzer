package com.example.file_parser.util;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.Set;

public class FolderUtils {

    private static final Set<String> IGNORE =
            Set.of(".git", "node_modules", "target", "build");

    public static List<File> getAllFiles(File root) throws IOException {
        return Files.walk(root.toPath())
                .filter(Files::isRegularFile)
                .filter(p -> IGNORE.stream().noneMatch(p.toString()::contains))
                .map(Path::toFile)
                .toList();
    }
}

