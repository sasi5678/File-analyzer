package com.example.file_parser.util;

import java.io.File;
import java.io.FileOutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

public class FileUtils {

    /**
     * Converts MultipartFile to temp File
     */
    public static File convertToFile(org.springframework.web.multipart.MultipartFile multipart)
            throws Exception {

        Path tempFile = Files.createTempFile("upload_", multipart.getOriginalFilename());
        multipart.transferTo(tempFile.toFile());
        return tempFile.toFile();
    }

    /**
     * SAFE unzip method (prevents Zip Slip)
     */
    public static File unzip(File zipFile) throws Exception {

        Path destDir = Files.createTempDirectory("unzipped_");

        try (ZipInputStream zis =
                     new ZipInputStream(Files.newInputStream(zipFile.toPath()))) {

            ZipEntry entry;

            while ((entry = zis.getNextEntry()) != null) {

                File newFile = safeFile(destDir.toFile(), entry);

                if (entry.isDirectory()) {
                    newFile.mkdirs();
                } else {
                    newFile.getParentFile().mkdirs();

                    try (FileOutputStream fos = new FileOutputStream(newFile)) {
                        zis.transferTo(fos);
                    }
                }
            }
        }
        return destDir.toFile();
    }

    // Zip Slip protection
    private static File safeFile(File destDir, ZipEntry entry) throws Exception {
        File destFile = new File(destDir, entry.getName());

        String destDirPath = destDir.getCanonicalPath();
        String destFilePath = destFile.getCanonicalPath();

        if (!destFilePath.startsWith(destDirPath + File.separator)) {
            throw new RuntimeException("Bad zip entry");
        }
        return destFile;
    }
}


