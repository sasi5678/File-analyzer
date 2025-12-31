package com.example.file_parser.dto;

import java.util.List;

public class ProjectDTO {
	public int totalFiles;
    public int getTotalFiles() {
		return totalFiles;
	}
	public void setTotalFiles(int totalFiles) {
		this.totalFiles = totalFiles;
	}
	public int getTotalLines() {
		return totalLines;
	}
	public void setTotalLines(int totalLines) {
		this.totalLines = totalLines;
	}
	public List<String> getDependencies() {
		return dependencies;
	}
	public void setDependencies(List<String> dependencies) {
		this.dependencies = dependencies;
	}
	public List<String> getApiEndpoints() {
		return apiEndpoints;
	}
	public void setApiEndpoints(List<String> apiEndpoints) {
		this.apiEndpoints = apiEndpoints;
	}
	public List<ClassDTO> getClasses() {
		return classes;
	}
	public void setClasses(List<ClassDTO> classes) {
		this.classes = classes;
	}
	public int totalLines;
    public List<String> dependencies;
    public List<String> apiEndpoints;
    public List<ClassDTO> classes;
}
