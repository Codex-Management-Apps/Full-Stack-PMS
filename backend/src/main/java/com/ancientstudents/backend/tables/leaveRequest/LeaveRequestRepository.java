package com.ancientstudents.backend.tables.leaveRequest;

import org.springframework.data.jpa.repository.JpaRepository;


public interface LeaveRequestRepository extends JpaRepository<LeaveRequest, Long> {
    
}
