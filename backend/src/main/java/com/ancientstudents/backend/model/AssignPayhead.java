package com.ancientstudents.backend.model;

import java.util.Date;

import com.ancientstudents.backend.utils.CustomDateSerializer;
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
public class AssignPayhead {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name="payroll_id", referencedColumnName = "id")
    private Payroll payroll;

    @ManyToOne
    @JoinColumn(name="payhead_id", referencedColumnName = "id")
    private Payhead payhead;

    @Temporal(TemporalType.TIMESTAMP)
    @JsonSerialize(using = CustomDateSerializer.class)
    @Column(name = "created_at")
    private Date createdAt;

    @Temporal(TemporalType.TIMESTAMP)
    @JsonSerialize(using = CustomDateSerializer.class)
    @Column(name = "last_updated")
    private Date lastUpdated;

    public AssignPayhead() {
    }

    public AssignPayhead(Long id, Payroll payroll, Payhead payhead, Date createdAt, Date lastUpdated) {
        this.id = id;
        this.payroll = payroll;
        this.payhead = payhead;
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

    public Payhead getPayhead() {
        return this.payhead;
    }

    public void setPayhead(Payhead payhead) {
        this.payhead = payhead;
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
            ", payhead='" + getPayhead() + "'" +
            ", createdAt='" + getCreatedAt() + "'" +
            ", lastUpdated='" + getLastUpdated() + "'" +
            "}";
    }
}
