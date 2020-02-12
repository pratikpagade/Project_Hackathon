package com.app.OpenHack.entity;

import java.util.Date;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
public class Hackathon {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	
	@Column(unique=true)
	private String eventName;
	@Temporal(TemporalType.TIMESTAMP)
	private Date startDate;
	@Temporal(TemporalType.TIMESTAMP)
	private Date endDate;
	@Column
	private String description;
	@Column
	private long fees;
	
	@ManyToMany
	@JsonIgnoreProperties({"organization","judging","teams"})
	private Set<User> judges;
	
	@Column
	private int minTeamSize;
	
	@Column
	private int maxTeamSize;
	
	@OneToMany
	@JoinColumn
	@JsonIgnoreProperties({"members","orgOwner"})
	private Set<Organization> sponsors;
	
	@Column
	private double discount;
	
	@ManyToOne
	@JoinColumn(name="creator_id")
	@JsonIgnoreProperties({"organization","judging","teams"})
	private User user;

	@OneToMany(mappedBy="hackathon")
	@JsonIgnoreProperties({"hackathon"})
	private Set<Team> teams;
	
	@Transient
	private boolean isOpen;
	
	@Column(columnDefinition = "boolean default false")
	private boolean isGraded;
	
	@Column(columnDefinition = "boolean default false")
	private boolean finalize;
	
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name="hackathon_id")
	private Set<Expense> expenses;
	
	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public Set<Expense> getExpenses() {
		return expenses;
	}

	public void setExpenses(Set<Expense> expenses) {
		this.expenses = expenses;
	}

	public String getEventName() {
		return eventName;
	}

	public void setEventName(String eventName) {
		this.eventName = eventName;
	}

	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public Date getEndDate() {
		return endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public long getFees() {
		return fees;
	}

	public void setFees(long fees) {
		this.fees = fees;
	}

	public Set<User> getJudges() {
		return judges;
	}

	public void setJudges(Set<User> judges) {
		this.judges = judges;
	}

	public int getMinTeamSize() {
		return minTeamSize;
	}

	public void setMinTeamSize(int minTeamSize) {
		this.minTeamSize = minTeamSize;
	}

	public int getMaxTeamSize() {
		return maxTeamSize;
	}

	public void setMaxTeamSize(int maxTeamSize) {
		this.maxTeamSize = maxTeamSize;
	}

	public Set<Organization> getSponsors() {
		return sponsors;
	}

	public void setSponsors(Set<Organization> sponsors) {
		this.sponsors = sponsors;
	}
	
	public double getDiscount() {
		return discount;
	}

	public void setDiscount(double discount) {
		this.discount = discount;
	}
	
	public User getUser() {
		return user;
	}
	
	public void setUser(User user) {
		this.user = user;
	}

	public Set<Team> getTeams() {
		return teams;
	}

	public void setTeams(Set<Team> teams) {
		this.teams = teams;
	}

	public boolean isOpen() {
		Date curr = new Date();
		if(this.startDate == null)
			return false;
		if(this.startDate.compareTo(curr)<=0 && this.endDate==null)
			return true;
		else if(this.startDate.compareTo(curr)>0 && this.endDate==null)
			return false;
		return this.startDate.compareTo(curr) * curr.compareTo(this.endDate) >= 0;
	}

	public void setOpen(boolean isOpen) {
		this.isOpen = isOpen;
	}

	public boolean isGraded() {
		return isGraded;
	}

	public void setGraded(boolean isGraded) {
		this.isGraded = isGraded;
	}

	public boolean isFinalize() {
		return finalize;
	}

	public void setFinalize(boolean finalize) {
		this.finalize = finalize;
	}
	
}
