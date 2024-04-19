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
public class LeaveRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    
    @ManyToOne
    @JoinColumn(name="employee_id", referencedColumnName = "id")
    private Employee employee;
    private String status;
    private String comment;
    private String leaveType;    
    private Date dateOfLeave;
    private Date dateOfEnd;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "created_at")
    private Date createdAt;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "last_updated")
    private Date lastUpdated;
    

    public LeaveRequest() {
    }

    public LeaveRequest(Long id, Employee employee, String status, String comment, String leaveType, Date dateOfLeave, Date dateOfEnd, Date createdAt, Date lastUpdated) {
        this.id = id;
        this.employee = employee;
        this.status = status;
        this.comment = comment;
        this.leaveType = leaveType;
        this.dateOfLeave = dateOfLeave;
        this.dateOfEnd = dateOfEnd;
        this.createdAt = createdAt;
        this.lastUpdated = lastUpdated;
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

    public String getStatus() {
        return this.status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getComment() {
        return this.comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public String getLeaveType() {
        return this.leaveType;
    }

    public void setLeaveType(String leaveType) {
        this.leaveType = leaveType;
    }

    public Date getDateOfLeave() {
        return this.dateOfLeave;
    }

    public void setDateOfLeave(Date dateOfLeave) {
        this.dateOfLeave = dateOfLeave;
    }

    public Date getDateOfEnd() {
        return this.dateOfEnd;
    }

    public void setDateOfEnd(Date dateOfEnd) {
        this.dateOfEnd = dateOfEnd;
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
            ", employee='" + getEmployee() + "'" +
            ", status='" + getStatus() + "'" +
            ", comment='" + getComment() + "'" +
            ", leaveType='" + getLeaveType() + "'" +
            ", dateOfLeave='" + getDateOfLeave() + "'" +
            ", dateOfEnd='" + getDateOfEnd() + "'" +
            ", createdAt='" + getCreatedAt() + "'" +
            ", lastUpdated='" + getLastUpdated() + "'" +
            "}";
    }


}



