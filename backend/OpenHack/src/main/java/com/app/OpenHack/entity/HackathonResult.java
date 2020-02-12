package com.app.OpenHack.entity;

import java.util.Set;

public class HackathonResult {

	private Long hid;
	private String eventName;
	private String uuid;
	private Set<TeamResult> teams;
//	private Long tid;
//	private String teamName;
//	private Float grades;
	
	public Long getHid() {
		return hid;
	}
	
	public void setHid(Long hid) {
		this.hid = hid;
	}
	public String getEventName() {
		return eventName;
	}
	public void setEventName(String eventName) {
		this.eventName = eventName;
	}
	public Set<TeamResult> getTeams() {
		return teams;
	}

	public void setTeams(Set<TeamResult> teams) {
		this.teams = teams;
	}
	
	public String getUuid() {
		return uuid;
	}
	public void setUuid(String uuid) {
		this.uuid = uuid;
	}
//	public Long getTid() {
//		return tid;
//	}
//	public void setTid(Long tid) {
//		this.tid = tid;
//	}
//	public String getTeamName() {
//		return teamName;
//	}
//	public void setTeamName(String teamName) {
//		this.teamName = teamName;
//	}
//	public Float getGrades() {
//		return grades;
//	}
//	public void setGrades(Float grades) {
//		this.grades = grades;
//	}
	
}
