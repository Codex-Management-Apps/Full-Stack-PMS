package com.ancientstudents.backend.tables.payroll;

import org.springframework.data.jpa.repository.JpaRepository;


public interface PayrollRepository extends JpaRepository<Payroll, Long> {
    
}
