package com.ancientstudents.backend.model;

import java.util.Date;

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
 
    @ManyToOne
    @JoinColumn(name="department_id", referencedColumnName = "id")
    private Department department;

    @ManyToOne
    @JoinColumn(name="designation_id", referencedColumnName = "id")
    private Designation designation;

    @ManyToOne
    @JoinColumn(name="employeedata_id", referencedColumnName = "id")
    private DataEmployee employeeData;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "created_at")
    private Date createdAt;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "last_updated")
    private Date lastUpdated;

    public Employee() {
    }


    public Employee(Long id, Department department, Designation designation, DataEmployee employeeData, Date createdAt, Date lastUpdated) {
        this.id = id;
        this.department = department;
        this.designation = designation;
        this.employeeData = employeeData;
        this.createdAt = createdAt;
        this.lastUpdated = lastUpdated;
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
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
            ", department='" + getDepartment() + "'" +
            ", designation='" + getDesignation() + "'" +
            ", employeeData='" + getEmployeeData() + "'" +
            ", createdAt='" + getCreatedAt() + "'" +
            ", lastUpdated='" + getLastUpdated() + "'" +
            "}";
    }

}   
