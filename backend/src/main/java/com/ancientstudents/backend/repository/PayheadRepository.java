package com.ancientstudents.backend.repository;

import com.ancientstudents.backend.model.Payhead;

import org.springframework.data.jpa.repository.JpaRepository;


public interface PayheadRepository extends JpaRepository<Payhead, Long> {
    
}
