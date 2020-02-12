package com.app.OpenHack.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.Date;
import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;
import java.util.TreeSet;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.OpenHack.entity.EarningResult;
import com.app.OpenHack.entity.Expense;
import com.app.OpenHack.entity.Hackathon;
import com.app.OpenHack.entity.HackathonResult;
import com.app.OpenHack.entity.Team;
import com.app.OpenHack.entity.TeamMember;
import com.app.OpenHack.entity.TeamResult;
import com.app.OpenHack.entity.User;
import com.app.OpenHack.repository.ExpenseRepository;
import com.app.OpenHack.repository.HackathonRepository;
import com.app.OpenHack.repository.TeamRepository;
import com.app.OpenHack.repository.UserRepository;

@Service
@Transactional
public class HackathonService {

	@Autowired
	HackathonRepository hackathonRepository;
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	TeamRepository teamRepository;
	
	@Autowired
	ExpenseRepository expenseRepository;
	
	/**
	 * @param id
	 * @return
	 */
	public Hackathon getHackathon(Long id) {
		return hackathonRepository.findById(id).orElse(null);
	}
	
	/**
	 * @param hackathon
	 * @param user
	 */
	public void createHackathon(Hackathon hackathon,User user) {
		hackathon.setUser(user);
		hackathonRepository.save(hackathon);
	}
	
	/**
	 * @param id
	 * @return
	 */
	public Hackathon startHackathon(Long id) {
		Hackathon hackathon = hackathonRepository.findById(id).orElseThrow(()->new IllegalArgumentException("Hackathon not found"));
		hackathon.setStartDate(new Date());
		hackathonRepository.save(hackathon);
		return hackathon;
	}
	
	/**
	 * @param id
	 * @return
	 */
	public Hackathon endHackathon(Long id) {
		Hackathon hackathon = hackathonRepository.findById(id).orElseThrow(()->new IllegalArgumentException("Hackathon not found"));
		hackathon.setEndDate(new Date());
		hackathonRepository.save(hackathon);
		return hackathon;
	}
	
	/**
	 * @param id
	 * @return
	 */
	public Hackathon startendHackathon(Long id) {
		Hackathon hackathon = hackathonRepository.findById(id).orElseThrow(()->new IllegalArgumentException("Hackathon not found"));
		Date today=new Date();
		long ltime=today.getTime()+7*24*60*60*1000;
		Date today8=new Date(ltime);
		hackathon.setEndDate(today8);
		hackathonRepository.save(hackathon);
		return hackathon;
	}
	
	/**
	 * @param user
	 * @return
	 */
	public List<Hackathon> getAllHackathons(User user){
		List<Hackathon> all = hackathonRepository.findAll();
		List<Hackathon> rval = new ArrayList<Hackathon>(all);
		for(Hackathon h:all) {
			for(User j:h.getJudges())
				if(j.getUuid().equals(user.getUuid()))
					rval.remove(h);
		}
		return rval;
	}
	
	/**
	 * @param user
	 * @return
	 */
	public List<Hackathon> getMyHackathons(User user) {
		List<Hackathon> rval = new ArrayList<Hackathon>();
		user = userRepository.findById(user.getUuid()).get();
		for(TeamMember t:user.getTeams()) {
			
				Hackathon hack = t.getTeam().getHackathon();
				if(hack.getSponsors().contains(user.getOrganization()))
					hack.setFees((long)(hack.getFees()-(hack.getFees()*hack.getDiscount()/100)));
				Set<Team> temp = new HashSet<Team>();
				Team team = t.getTeam();
				team.setMembers(t.getTeam().getMembers());
				temp.add(team);
				
				hack.setTeams(temp);
				rval.add(t.getTeam().getHackathon());
			
		}
		return rval;
	}
	
	/**
	 * @param user
	 * @return
	 */
	public List<Hackathon> getPendingHackathons(User user) {
		
		List<Hackathon> rval = new ArrayList<Hackathon>();
		for(TeamMember t:user.getTeams()) {
			if(!t.isJoined()) {
				Hackathon hack = t.getTeam().getHackathon();
				Set<Team> temp = new HashSet<Team>();
				temp.add(t.getTeam());
				hack.setTeams(temp);
				rval.add(t.getTeam().getHackathon());
			}
		}
		return rval;
	}
	
	/**
	 * @param user
	 * @return
	 */
	public List<Hackathon> getCreatedHackathons(User user) {
		List<Hackathon> all = hackathonRepository.findAll();
		List<Hackathon> rval = new ArrayList<Hackathon>();
		for(Hackathon h:all) {
			if(h.getUser().getUuid().equals(user.getUuid()))
				rval.add(h);
		}
		return rval;
	}
	
	/**
	 * @param user
	 * @return
	 */
	public List<Hackathon> getjudgeHackathons(User user) {
		List<Hackathon> all = hackathonRepository.findAll();
		List<Hackathon> rval = new ArrayList<Hackathon>();
		Date date = new Date();  
		for(Hackathon h:all) {
			
			if(h.getEndDate().compareTo(date)<0) {

			for(User j:h.getJudges())
				if(j.getUuid().equals(user.getUuid()))
				rval.add(h);
		}
		}
		return rval;
	}

	/**
	 * @return
	 */
	public List<HackathonResult> getAllResults() {

		List<Hackathon> all = hackathonRepository.findAll();
		List<Hackathon> rval = new ArrayList<Hackathon>();
		for(Hackathon h:all) {
			if(h.isFinalize()==true && h.isGraded()) {
				Set<Team> teams = h.getTeams();
				
				teams = new TreeSet<Team>(new Comparator<Team>() {
			        @Override
			        public int compare(Team t1, Team t2) {
			        	if(t1.getGrades()==null && t2.getGrades()==null)
			        		return 0;
			        	else if(t1.getGrades()==null)
			        		return 1;
			        	else if(t2.getGrades()==null)
			        		return -1;
			            return t2.getGrades().compareTo(t1.getGrades());
			        }
			    });
				teams.addAll(h.getTeams());
				h.setTeams(teams);
				rval.add(h);
				
			}
			
		}
		
		List<HackathonResult> result = new ArrayList<HackathonResult>();
		for(Hackathon h1:rval)
		{
			HackathonResult hr = new HackathonResult();
			Set<TeamResult> temp = new LinkedHashSet<TeamResult>();
			hr.setHid(h1.getId());
			hr.setEventName(h1.getEventName());
			hr.setUuid(h1.getUser().getUuid());
			for(Team t:h1.getTeams()) {
				//rechecking the grading part
				// to get only graded teams from the graded hackathon
				if(t.getGrades()!=null) {
					TeamResult tr = new TeamResult();
					tr.setTid(t.getId());
					tr.setname(t.getName());
					tr.setGrades(t.getGrades());
					tr.setMembers(t.getMembers());
					temp.add(tr);	
				}
			}
			hr.setTeams(temp);
			result.add(hr);		
		}
		return result;
	}
	
	/**
	 * @return
	 */
	public List<HackathonResult> getAllPaymentResult() {

		List<Hackathon> all = hackathonRepository.findAll();
		List<Hackathon> rval = new ArrayList<Hackathon>();
		Boolean addHackathon = false;
		for(Hackathon h:all) {
			
				addHackathon=false;
				for(Team t:h.getTeams())
				{
					if(t.getMembers()!=null) {
						addHackathon= true;
						break;
						}
				}
				if(addHackathon)
				{
					rval.add(h);
				}
			
		}
		
		List<HackathonResult> result = new ArrayList<HackathonResult>();
		for(Hackathon h1:rval)
		{
			HackathonResult hr = new HackathonResult();
			Set<TeamResult> temp = new LinkedHashSet<TeamResult>();
			hr.setHid(h1.getId());
			hr.setEventName(h1.getEventName());
			hr.setUuid(h1.getUser().getUuid());
			for(Team t:h1.getTeams()) {
				//rechecking the grading part
				// to get only graded teams from the graded hackathon
				if(t.getMembers()!=null) {
					TeamResult tr = new TeamResult();
					tr.setTid(t.getId());
					tr.setname(t.getName());
					tr.setGrades(t.getGrades());
					tr.setMembers(t.getMembers());
					temp.add(tr);	
				}
			}
			hr.setTeams(temp);
			result.add(hr);		
		}
		return result;
	}

	
	/**
	 * @param id
	 */
	public void finalize(Long id) {
		Hackathon hack = hackathonRepository.findById(id).get();
		for(Team t:hack.getTeams()) {
			if(t.getSubmitionUrl()!=null && t.getGrades()==null)
				throw new IllegalArgumentException("Hackathon can not be finalized yet");
		}
		hack.setFinalize(true);
		hackathonRepository.save(hack);
	}
	
	/**
	 * @return
	 */
	public List<EarningResult> getAllEarning() {
		List<Hackathon> all = hackathonRepository.findAll();
		List<EarningResult> result = new ArrayList<EarningResult>();
		for(Hackathon h:all) {
			
				long sponsorSize;
				if(h.getSponsors()==null)
				{
					sponsorSize=0;
				}
				else
				{
					sponsorSize = h.getSponsors().size();
				}
				double expenseSum=0;
				if(h.getExpenses()!=null)
				{
					for(Expense e:h.getExpenses())
					{
						expenseSum=expenseSum+e.getExpenseAmount();
					}
					
				}
				int size=0;
				if(h.getTeams()!=null)
				{
					size = h.getTeams().size();
				}
				
				long unpaidAmount=0;
				if(size==0)
				{
					unpaidAmount = 0;
				}
				else
				{
					unpaidAmount = h.getFees();
				}
					
				EarningResult er = new EarningResult();
				er.setHid(h.getId());
				er.setName(h.getEventName());
				er.setUuid(h.getUser().getUuid());
				er.setTotalTeamCount(size);
				er.setPaidAmount(size*h.getFees());
				er.setUnpaidAmount(unpaidAmount);
				er.setRevenueAmount(sponsorSize*1000);
				er.setExpense(expenseSum);
				er.setProfit(size*h.getFees()+sponsorSize*1000-expenseSum);
				result.add(er);
				}
			
		return result;
	}
	
	/**
	 * @param id
	 * @param exp
	 * @return
	 */
	public Hackathon addExpenseHackathon(Long id,Expense exp) {
		Hackathon hackathon = hackathonRepository.findById(id).get();
		if(hackathon.isFinalize()==true)
		{
			throw new IllegalArgumentException("Expenses can not be added as hackathon is finalized");
		}
//		Date date = new Date();
//		exp.setTime(date);
		Set<Expense> temp = new HashSet<Expense>();
		temp = hackathon.getExpenses();
		temp.add(exp);
		expenseRepository.save(exp);
		hackathon.setExpenses(temp);
		hackathonRepository.save(hackathon);
		return hackathon;
	}
}
