package com.ancientstudents.backend.repository;

import com.ancientstudents.backend.model.Payroll;

import org.springframework.data.jpa.repository.JpaRepository;


public interface PayrollRepository extends JpaRepository<Payroll, Long> {
    
}
