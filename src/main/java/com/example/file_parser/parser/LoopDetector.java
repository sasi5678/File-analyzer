package com.example.file_parser.parser;


import java.util.ArrayList;
import java.util.List;

public class LoopDetector {

    public static List<String> detectLoops(
            List<String> lines,
            int start,
            int end
    ) {
        List<String> loops = new ArrayList<>();

        if(lines == null || lines.isEmpty()) return loops;
        
        for (int i = start; i <= end; i++) {
            String l = lines.get(i).trim();

            if (l.startsWith("for(") || l.startsWith("for (")) {
                loops.add("for");
            } else if (l.startsWith("while(") || l.startsWith("while (")) {
                loops.add("while");
            } else if (l.startsWith("do {")) {
                loops.add("do-while");
            }
        }
        return loops;
    }
}

