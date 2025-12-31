package com.example.file_parser.dto;

import java.util.List;

public class FileAnalysisDTO {
    public String getFileName() {
		return fileName;
	}
	public void setFileName(String fileName) {
		this.fileName = fileName;
	}
	public int getTotalLines() {
		return totalLines;
	}
	public void setTotalLines(int totalLines) {
		this.totalLines = totalLines;
	}
	public int getCodeLines() {
		return codeLines;
	}
	public void setCodeLines(int codeLines) {
		this.codeLines = codeLines;
	}
	public int getCommentLines() {
		return commentLines;
	}
	public void setCommentLines(int commentLines) {
		this.commentLines = commentLines;
	}
	public int getBlankLines() {
		return blankLines;
	}
	public void setBlankLines(int blankLines) {
		this.blankLines = blankLines;
	}
	public List<String> getImports() {
		return imports;
	}
	public void setImports(List<String> imports) {
		this.imports = imports;
	}
	public List<ClassDTO> getClasses() {
		return classes;
	}
	public void setClasses(List<ClassDTO> classes) {
		this.classes = classes;
	}
	public String fileName;
    public int totalLines;
    public int codeLines;
    public int commentLines;
    public int blankLines;
    public List<String> imports;
    public List<ClassDTO> classes;
}
