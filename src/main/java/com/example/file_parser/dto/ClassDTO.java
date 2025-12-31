package com.example.file_parser.dto;

import java.util.List;

public class ClassDTO {
    public String className;
    public String getClassName() {
		return className;
	}
	public void setClassName(String className) {
		this.className = className;
	}
	public int getTotalLines() {
		return totalLines;
	}
	public void setTotalLines(int totalLines) {
		this.totalLines = totalLines;
	}
	public List<MethodDTO> getMethods() {
		return methods;
	}
	public void setMethods(List<MethodDTO> methods) {
		this.methods = methods;
	}
	public List<String> getErrors() {
		return errors;
	}
	public void setErrors(List<String> errors) {
		this.errors = errors;
	}
	public int totalLines;
    public List<MethodDTO> methods;
    public List<String> errors;
}
