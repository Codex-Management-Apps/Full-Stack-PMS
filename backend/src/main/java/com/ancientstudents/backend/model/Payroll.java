package com.ancientstudents.backend.model;

import java.util.Date;

import com.ancientstudents.backend.serializer.CustomDateSerializer;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

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
public class Payroll {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name="signatory_id", referencedColumnName = "id")
    private Signatory signatory;

    @ManyToOne
    @JoinColumn(name="employee_id", referencedColumnName = "id")
    private Employee employee;

    private Date start;
    private Date end;

    private double total_earnings;
    private double total_deductions;
    private double net_pay;

    @Temporal(TemporalType.TIMESTAMP)
    @JsonSerialize(using = CustomDateSerializer.class)
    @Column(name = "created_at")
    private Date createdAt;

    @Temporal(TemporalType.TIMESTAMP)
    @JsonSerialize(using = CustomDateSerializer.class)
    @Column(name = "last_updated")
    private Date lastUpdated;

    public Payroll() {
    }

    public Payroll(Long id, Signatory signatory, Employee employee, Date start, Date end, double total_earnings, double total_deductions, double net_pay, Date createdAt, Date lastUpdated) {
        this.id = id;
        this.signatory = signatory;
        this.employee = employee;
        this.start = start;
        this.end = end;
        this.total_earnings = total_earnings;
        this.total_deductions = total_deductions;
        this.net_pay = net_pay;
        this.createdAt = createdAt;
        this.lastUpdated = lastUpdated;
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Signatory getSignatory() {
        return this.signatory;
    }

    public void setSignatory(Signatory signatory) {
        this.signatory = signatory;
    }

    public Employee getEmployee() {
        return this.employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public Date getStart() {
        return this.start;
    }

    public void setStart(Date start) {
        this.start = start;
    }

    public Date getEnd() {
        return this.end;
    }

    public void setEnd(Date end) {
        this.end = end;
    }

    public double getTotal_earnings() {
        return this.total_earnings;
    }

    public void setTotal_earnings(double total_earnings) {
        this.total_earnings = total_earnings;
    }

    public double getTotal_deductions() {
        return this.total_deductions;
    }

    public void setTotal_deductions(double total_deductions) {
        this.total_deductions = total_deductions;
    }

    public double getNet_pay() {
        return this.net_pay;
    }

    public void setNet_pay(double net_pay) {
        this.net_pay = net_pay;
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
            ", signatory='" + getSignatory() + "'" +
            ", employee='" + getEmployee() + "'" +
            ", start='" + getStart() + "'" +
            ", end='" + getEnd() + "'" +
            ", total_earnings='" + getTotal_earnings() + "'" +
            ", total_deductions='" + getTotal_deductions() + "'" +
            ", net_pay='" + getNet_pay() + "'" +
            ", createdAt='" + getCreatedAt() + "'" +
            ", lastUpdated='" + getLastUpdated() + "'" +
            "}";
    }

}
