package com.example.file_parser.dto;

import java.util.List;

public class MethodDTO {

	    public String getMethodName() {
		return methodName;
	}
	public void setMethodName(String methodName) {
		this.methodName = methodName;
	}
	public int getLines() {
		return lines;
	}
	public void setLines(int lines) {
		this.lines = lines;
	}
	public String getTimeComplexity() {
		return timeComplexity;
	}
	public void setTimeComplexity(String timeComplexity) {
		this.timeComplexity = timeComplexity;
	}
	public List<String> getLoops() {
		return loops;
	}
	public void setLoops(List<String> loops) {
		this.loops = loops;
	}
		public String methodName;
	    public int lines;
	    public String timeComplexity;
	    public List<String> loops;
	
}
