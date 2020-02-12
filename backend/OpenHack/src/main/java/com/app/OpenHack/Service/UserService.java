package com.app.OpenHack.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.OpenHack.entity.Hackathon;
import com.app.OpenHack.entity.Team;
import com.app.OpenHack.entity.TeamMember;
import com.app.OpenHack.entity.User;
import com.app.OpenHack.repository.HackathonRepository;
import com.app.OpenHack.repository.UserRepository;
import com.app.OpenHack.util.SendEmail;

@Service
@Transactional
public class UserService {

	@Autowired
	UserRepository userRepository;
	
	@Autowired
	HackathonRepository hackathonRepository;
	
	@Autowired
	SendEmail sendEmail;
	
	/**
	 * @param user
	 * @param uid
	 */
	public void updateUser(User user, String uid) {
		User value = userRepository.findById(uid).get();
		if(user.getName()!=null)
			value.setName(user.getName());
		if(user.getAboutMe()!=null)
			value.setAboutMe(user.getAboutMe());
		if(user.getAddress()!=null)
			value.setAddress(user.getAddress());
		if(user.getBussinessTitle()!=null)
			value.setBussinessTitle(user.getBussinessTitle());
		if(user.getOrganization()!=null)
			value.setOrganization(user.getOrganization());
		if(user.getPhotoUrl()!=null)
			value.setPhotoUrl(user.getPhotoUrl());
		if(user.getScreenName()!=null)
			value.setScreenName(user.getScreenName());
		userRepository.save(value);
	}
	
	/**
	 * @return
	 */
	public List<User> getAllHackers(){
		return userRepository.findByEmailIgnoreCaseContaining("@sjsu.edu");
	}
	
	/**
	 * @param user
	 */
	public void createUser(User user) {
		//sendEmail.sendEmail(user.getEmail(), "OpenHack - Verify Email", GlobalConst.url+"user/verify");
		userRepository.save(user);
	}
	
	/**
	 * @param uid
	 */
	public void deleteUser(String uid) {
		userRepository.deleteById(uid);
	}
	
	/**
	 * @param uuid
	 * @return
	 */
	public User getUser(String uuid) {
		return userRepository.findById(uuid).get();
	}
	
	/**
	 * @param id
	 * @return
	 */
	public List<User> getAllValidHackers(Long id) {
		List<User> rval = userRepository.findByEmailIgnoreCaseContaining("@sjsu.edu");
		Hackathon hack = hackathonRepository.findById(id).get();
		
		for(Team t:hack.getTeams()) {
			for(TeamMember tm:t.getMembers()) {
				rval.remove(tm.getMember());
			}
		}
		
		for(User u:hack.getJudges())
			rval.remove(u);
		return rval;
	}

	/**
	 * @param uuid
	 */
	public void updateUserOrganization(String uuid) {
		User value = userRepository.findById(uuid).get();
		value.setOrganization(null);
		userRepository.save(value);
		
	}
}
