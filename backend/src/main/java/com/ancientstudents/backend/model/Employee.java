package com.ancientstudents.backend.model;

import java.util.Date;

import com.ancientstudents.backend.utils.CustomDateDeserializer;
import com.ancientstudents.backend.utils.CustomDateSerializer;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="emp_num")
    private String empNum;

    @ManyToOne(cascade = CascadeType.ALL) 
    @JoinColumn(name="department_id", referencedColumnName = "id")
    private Department department;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="designation_id", referencedColumnName = "id")
    private Designation designation;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="employeedata_id", referencedColumnName = "id")
    private DataEmployee employeeData;

    private String employeeType;
    private String status;

    @Temporal(TemporalType.TIMESTAMP)
    @JsonSerialize(using = CustomDateSerializer.class)
    @JsonDeserialize(using = CustomDateDeserializer.class)
    @Column(name = "created_at")
    private Date createdAt;

    @Temporal(TemporalType.TIMESTAMP)
    @JsonSerialize(using = CustomDateSerializer.class)
    @JsonDeserialize(using = CustomDateDeserializer.class)
    @Column(name = "last_updated")
    private Date lastUpdated;

    public Employee() {
    }

    public Employee(Long id, String empNum, Department department, Designation designation, DataEmployee employeeData, String employeeType, Date createdAt, Date lastUpdated) {
        this.id = id;
        this.empNum = empNum;
        this.department = department;
        this.designation = designation;
        this.employeeData = employeeData;
        this.employeeType = employeeType;
        this.createdAt = createdAt;
        this.lastUpdated = lastUpdated;
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmpNum() {
        return this.empNum;
    }

    public void setEmpNum(String empNum) {
        this.empNum = empNum;
    }

    public Department getDepartment() {
        return this.department;
    }

    public void setDepartment(Department department) {
        this.department = department;
    }

    public Designation getDesignation() {
        return this.designation;
    }

    public void setDesignation(Designation designation) {
        this.designation = designation;
    }

    public DataEmployee getEmployeeData() {
        return this.employeeData;
    }

    public void setEmployeeData(DataEmployee employeeData) {
        this.employeeData = employeeData;
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

    public Date getCreatedAt() {
        return this.createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Date getLastUpdated() {
        return this.lastUpdated;
    }

    public void setLastUpdated(Date lastUpdated) {
        this.lastUpdated = lastUpdated;
    }


    @Override
    public String toString() {
        return "{" +
            " id='" + getId() + "'" +
            ", empNum='" + getEmpNum() + "'" +
            ", department='" + getDepartment() + "'" +
            ", designation='" + getDesignation() + "'" +
            ", employeeData='" + getEmployeeData() + "'" +
            ", employeeType='" + getEmployeeType() + "'" +
            ", createdAt='" + getCreatedAt() + "'" +
            ", lastUpdated='" + getLastUpdated() + "'" +
            "}";
    }
    
}   
