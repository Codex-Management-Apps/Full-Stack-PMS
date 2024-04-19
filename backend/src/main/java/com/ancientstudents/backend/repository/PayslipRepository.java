package com.ancientstudents.backend.repository;

import com.ancientstudents.backend.model.Payslip;

import org.springframework.data.jpa.repository.JpaRepository;


public interface PayslipRepository extends JpaRepository<Payslip, Long> {
    
}
