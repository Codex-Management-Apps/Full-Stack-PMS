package com.ancientstudents.backend.model;

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

    @ManyToOne
    @JoinColumn(name = "employeeId", referencedColumnName = "id")
    private Employee employee;

    @ManyToOne
    @JoinColumn(name = "designationId", referencedColumnName = "id")
    private Designation designation;


    @Column(name = "employeeType")
    private String employeeType;

    @Column(name = "status")
    private String status;
 
    public AssignDesignation() {
    }

    public AssignDesignation(Long id, Employee employee, Designation designation, Department department, String employeeType, String status) {
        this.id = id;
        this.employee = employee;
        this.designation = designation;
        this.employeeType = employeeType;
        this.status = status;
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Employee getEmployee() {
        return this.employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public Designation getDesignation() {
        return this.designation;
    }

    public void setDesignation(Designation designation) {
        this.designation = designation;
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

    public AssignDesignation id(Long id) {
        setId(id);
        return this;
    }

    public AssignDesignation employee(Employee employee) {
        setEmployee(employee);
        return this;
    }

    public AssignDesignation designation(Designation designation) {
        setDesignation(designation);
        return this;
    }

    public AssignDesignation status(String status) {
        setStatus(status);
        return this;
    }


    @Override
    public String toString() {
        return "{" +
            " id='" + getId() + "'" +
            ", employee='" + getEmployee() + "'" +
            ", designation='" + getDesignation() + "'" +
            ", employeeType='" + getEmployeeType() + "'" +
            ", status='" + getStatus() + "'" +
            "}";
    }

}