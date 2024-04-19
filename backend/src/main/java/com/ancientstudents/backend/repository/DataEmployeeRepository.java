package com.ancientstudents.backend.repository;

import com.ancientstudents.backend.model.DataEmployee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DataEmployeeRepository extends JpaRepository<DataEmployee,Long>{
    
}
