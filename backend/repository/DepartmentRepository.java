package com.ancientstudents.backend.repository;

import com.ancientstudents.backend.model.Department;

import org.springframework.data.jpa.repository.JpaRepository;

public interface DepartmentRepository extends JpaRepository<Department, Long> {

}
