package com.ancientstudents.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.ancientstudents.backend.model.Deduction;

public interface DeductionRepository extends JpaRepository<Deduction,Long> {
    
}
