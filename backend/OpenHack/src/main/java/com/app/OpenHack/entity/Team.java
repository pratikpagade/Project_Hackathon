package com.app.OpenHack.entity;

import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
public class Team {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	@Column
	private String name;
	
	@Column
	private String submitionUrl;
	
	@Column
	private Float grades;
	
	@Column
	private String uuid;

	@ManyToOne(fetch = FetchType.EAGER)
	private Hackathon hackathon;

	@OneToMany(mappedBy="team")
	@JsonIgnoreProperties({"team"})
	private Set<TeamMember> members;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Hackathon getHackathon() {
		return hackathon;
	}

	public void setHackathon(Hackathon hackathon) {
		this.hackathon = hackathon;
	}

	public Set<TeamMember> getMembers() {
		return members;
	}

	public void setMembers(Set<TeamMember> members) {
		this.members = members;
	}

	public String getSubmitionUrl() {
		return submitionUrl;
	}

	public void setSubmitionUrl(String submitionUrl) {
		this.submitionUrl = submitionUrl;
	}

	public Float getGrades() {
		return grades;
	}

	public void setGrades(Float grades) {
		this.grades = grades;
	}
	
	public String getUuid() {
		return uuid;
	}

	public void setUuid(String uuid) {
		this.uuid = uuid;
	}
	
}
