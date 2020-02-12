package com.app.OpenHack.entity;

import java.util.Set;

public class TeamResult {

	private long tid;
	private String name;
	private Float grades;
	private Set<TeamMember> members;
	
	public Long getTid() {
		return tid;
	}
	public void setTid(Long tid) {
		this.tid = tid;
	}
	public String getname() {
		return name;
	}
	public void setname(String name) {
		this.name = name;
	}
	public Float getGrades() {
		return grades;
	}

	public void setGrades(Float grades) {
		this.grades = grades;
	}
	
	public Set<TeamMember> getMembers() {
		return members;
	}

	public void setMembers(Set<TeamMember> members) {
		this.members = members;
	}
}
