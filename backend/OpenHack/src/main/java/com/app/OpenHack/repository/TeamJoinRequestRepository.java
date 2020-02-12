package com.app.OpenHack.repository;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.app.OpenHack.entity.TeamJoinRequest;

@Repository
public interface TeamJoinRequestRepository extends JpaRepository<TeamJoinRequest, Long>{
	@Transactional
	public void deleteByUserId(String userId);
	public TeamJoinRequest findByToken(String token);
	@Transactional
	@Modifying
	@Query("DELETE FROM TeamJoinRequest t WHERE t.userId=:userId AND t.teamId=:teamId")
	public void deleteByUserIdAndTeam(@Param("userId") String userId,@Param("teamId") Long teamId);
}
