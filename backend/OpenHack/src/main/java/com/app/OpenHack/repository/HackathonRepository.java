package com.app.OpenHack.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.OpenHack.entity.Hackathon;

@Repository
public interface HackathonRepository extends JpaRepository<Hackathon, Long>{
	
}
