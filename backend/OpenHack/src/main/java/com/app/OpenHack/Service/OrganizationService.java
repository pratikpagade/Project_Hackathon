package com.app.OpenHack.Service;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.OpenHack.GlobalConst;
import com.app.OpenHack.entity.OrgJoinRequest;
import com.app.OpenHack.entity.Organization;
import com.app.OpenHack.entity.User;
import com.app.OpenHack.repository.OrganizationRepository;
import com.app.OpenHack.repository.OrganizationRequestRepository;
import com.app.OpenHack.repository.UserRepository;
import com.app.OpenHack.util.SendEmail;

@Service
@Transactional
public class OrganizationService {
	@Autowired
	OrganizationRepository organizationRepository;
	
	@Autowired
	OrganizationRequestRepository organizationRequestRepository;
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	SendEmail sendEmail;
	
	/**
	 * @param org
	 * @param user
	 */
	public void createOrganization(Organization org,User user) {
		org.setOrgOwner(user);
		organizationRepository.save(org);
	}
	
	/**
	 * @param id
	 * @return
	 */
	public Organization getOrganization(Long id) {
		return organizationRepository.findById(id).orElse(null);
	}
	
	/**
	 * @param orgId
	 * @param u
	 */
	public void requestToJoin(Long orgId, User u) {
		OrgJoinRequest req = new OrgJoinRequest();
		try {
		organizationRequestRepository.deleteByUserId(u.getUuid());

		}catch(Exception e) {
			System.out.println("Inside catch");
		}

		organizationRequestRepository.flush();

		Organization org = organizationRepository.findById(orgId).get();
		String randomId = UUID.randomUUID().toString();
		if(u.getOrganization()!=null)
		{
			u.setOrganization(null);
			userRepository.save(u);
		}
		
		req.setOrgId(orgId);
		req.setToken(randomId);
		req.setUserId(u.getUuid());
		organizationRequestRepository.save(req);
		sendEmail.sendEmail(org.getOrgOwner().getEmail(), "Request to join organization - " + org.getOrgName(), GlobalConst.url+"organization/join?token="+randomId);
		
}
	
	/**
	 * @param token
	 */
	public void joinOrganization(String token) {
		OrgJoinRequest req = organizationRequestRepository.findByToken(token);
		User u = userRepository.findById(req.getUserId()).get();
		Organization org = organizationRepository.findById(req.getOrgId()).get();
		u.setOrganization(org);
		userRepository.save(u);
		organizationRequestRepository.deleteById(req.getId());
	}
	
	/**
	 * @return
	 */
	public List<Organization> getAllOrganization(){
		return organizationRepository.findAll();
	}
}
