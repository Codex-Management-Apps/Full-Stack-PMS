package com.ancientstudents.backend.repository;

import com.ancientstudents.backend.model.LeaveRequest;

import org.springframework.data.jpa.repository.JpaRepository;


public interface LeaveRequestRepository extends JpaRepository<LeaveRequest, Long> {
    
}
