package com.ancientstudents.backend.model;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Designation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "designation_name")
    private String designationName;

    @ManyToOne
    @JoinColumn(name = "departmentId", referencedColumnName = "id")
    private Department departmentId;

    private String status;

    public Designation() {
    }

    public Designation(Long id, String designationName, Department departmentId, String status, List<AssignDesignation> assignedDesignations) {
        this.id = id;
        this.designationName = designationName;
        this.departmentId = departmentId;
        this.status = status;
        //this.assignedDesignations = assignedDesignations;
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDesignationName() {
        return this.designationName;
    }

    public void setDesignationName(String designationName) {
        this.designationName = designationName;
    }

    public Department getDepartmentId() {
        return this.departmentId;
    }

    public void setDepartmentId(Department departmentId) {
        this.departmentId = departmentId;
    }

    public String getStatus() {
        return this.status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    // public List<AssignDesignation> getAssignedDesignations() {
    //     return this.assignedDesignations;
    // }

    // public void setAssignedDesignations(List<AssignDesignation> assignedDesignations) {
    //     this.assignedDesignations = assignedDesignations;
    // }

    public Designation id(Long id) {
        setId(id);
        return this;
    }

    public Designation designationName(String designationName) {
        setDesignationName(designationName);
        return this;
    }

    public Designation departmentId(Department departmentId) {
        setDepartmentId(departmentId);
        return this;
    }

    public Designation status(String status) {
        setStatus(status);
        return this;
    }

    // public Designation assignedDesignations(List<AssignDesignation> assignedDesignations) {
    //     setAssignedDesignations(assignedDesignations);
    //     return this;
    // }

    @Override
    public String toString() {
        return "{" +
            " id='" + getId() + "'" +
            ", designationName='" + getDesignationName() + "'" +
            ", departmentId='" + getDepartmentId() + "'" +
            ", status='" + getStatus() + "'" +
           // ", assignedDesignations='" + getAssignedDesignations() + "'" +
            "}";
    }
    
}