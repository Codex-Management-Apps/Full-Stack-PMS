package com.ancientstudents.backend.repository;

import com.ancientstudents.backend.model.Deduction;

import org.springframework.data.jpa.repository.JpaRepository;


public interface DeductionRepository extends JpaRepository<Deduction, Long> {
    
}
