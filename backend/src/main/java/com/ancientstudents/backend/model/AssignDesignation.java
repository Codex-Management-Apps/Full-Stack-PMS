package com.ancientstudents.backend.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class AssignDesignation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="employeeId")
    private Employee empNum;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="DesignationId")
    private Designation designationId;
    
    @Column(name = "employeeType")
    private String employeeType;

    @Column(name = "status")
    private String status;

    public AssignDesignation(){ }

    public AssignDesignation(String employeeType,String status){
        this.employeeType = employeeType;
        this.status = status;
    }


    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Employee getEmpNum() {
        return this.empNum;
    }

    public void setEmpNum(Employee empNum) {
        this.empNum = empNum;
    }

    public Designation getDesignationId() {
        return this.designationId;
    }

    public void setDesignationId(Designation designationId) {
        this.designationId = designationId;
    }

    public String getEmployeeType() {
        return this.employeeType;
    }

    public void setEmployeeType(String employeeType) {
        this.employeeType = employeeType;
    }

    public String getStatus() {
        return this.status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

}