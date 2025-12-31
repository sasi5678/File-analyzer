package com.example.file_parser.util;

public class LanguageUtils {

    public static String getExtension(String name) {
        int i = name.lastIndexOf(".");
        return i == -1 ? "" : name.substring(i + 1);
    }
}

