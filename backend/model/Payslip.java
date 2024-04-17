package com.ancientstudents.backend.model;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Payslip {
    @Id
    @GeneratedValue
    private Long id;
    private Long deductions;
    private Long addEarnings;
    private Long payroll;
    private Employee employee;
    private String status;
    private String created_by;
    private String updated_by;


    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getDeductions() {
        return this.deductions;
    }

    public void setDeductions(Long deductions) {
        this.deductions = deductions;
    }

    public Long getAddEarnings() {
        return this.addEarnings;
    }

    public void setAddEarnings(Long addEarnings) {
        this.addEarnings = addEarnings;
    }

    public Long getPayroll() {
        return this.payroll;
    }

    public void setPayroll(Long payroll) {
        this.payroll = payroll;
    }

    public Employee getEmployee() {
        return this.employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public String getStatus() {
        return this.status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getCreated_by() {
        return this.created_by;
    }

    public void setCreated_by(String created_by) {
        this.created_by = created_by;
    }

    public String getUpdated_by() {
        return this.updated_by;
    }

    public void setUpdated_by(String updated_by) {
        this.updated_by = updated_by;
    }
    
}
