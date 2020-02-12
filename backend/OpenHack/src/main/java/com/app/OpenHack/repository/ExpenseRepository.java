package com.app.OpenHack.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.OpenHack.entity.Expense;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Long>{
	
}
