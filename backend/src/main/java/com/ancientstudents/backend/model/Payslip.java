package com.ancientstudents.backend.model;

import java.util.Date;

import com.ancientstudents.backend.utils.CustomDateDeserializer;
import com.ancientstudents.backend.utils.CustomDateSerializer;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
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
public class Payslip {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name="payroll_id", referencedColumnName = "id")
    private Payroll payroll;

    private double total_earnings;
    private double total_deductions;
    private double net_pay;

    @Temporal(TemporalType.TIMESTAMP)
    @JsonSerialize(using = CustomDateSerializer.class)
    @JsonDeserialize(using = CustomDateDeserializer.class)
    private Date issued_date;
    
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

    public Payslip() {
    }


    public Payslip(Long id, Payroll payroll, double total_earnings, double total_deductions, double net_pay, Date issued_date, Date createdAt, Date lastUpdated) {
        this.id = id;
        this.payroll = payroll;
        this.total_earnings = total_earnings;
        this.total_deductions = total_deductions;
        this.net_pay = net_pay;
        this.issued_date = issued_date;
        this.createdAt = createdAt;
        this.lastUpdated = lastUpdated;
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Payroll getPayroll() {
        return this.payroll;
    }

    public void setPayroll(Payroll payroll) {
        this.payroll = payroll;
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

    public Date getIssued_date() {
        return this.issued_date;
    }

    public void setIssued_date(Date issued_date) {
        this.issued_date = issued_date;
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
            ", payroll='" + getPayroll() + "'" +
            ", total_earnings='" + getTotal_earnings() + "'" +
            ", total_deductions='" + getTotal_deductions() + "'" +
            ", net_pay='" + getNet_pay() + "'" +
            ", issued_date='" + getIssued_date() + "'" +
            ", createdAt='" + getCreatedAt() + "'" +
            ", lastUpdated='" + getLastUpdated() + "'" +
            "}";
    }

}
