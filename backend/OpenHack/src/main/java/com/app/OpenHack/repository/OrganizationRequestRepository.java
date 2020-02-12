package com.app.OpenHack.repository;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.OpenHack.entity.OrgJoinRequest;

public interface OrganizationRequestRepository extends JpaRepository<OrgJoinRequest, Long>{

	@Transactional
	public void deleteByUserId(String userId);
	public OrgJoinRequest findByUserId(String userId);
	public OrgJoinRequest findByToken(String token);
	
}
