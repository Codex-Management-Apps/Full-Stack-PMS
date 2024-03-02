package com.ancientstudents.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Designation {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String designation_name;
    private String department_id;
    private String status;

    public Designation(Long id, String designation_name, String department_id, String status) {
        this.id = id;
        this.designation_name = designation_name;
        this.department_id = department_id;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDesignation_name() {
        return designation_name;
    }

    public void setDesignation_name(String designation_name) {
        this.designation_name = designation_name;
    }

    public String getDepartment_id() {
        return department_id;
    }

    public void setDepartment_id(String department_id) {
        this.department_id = department_id;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
