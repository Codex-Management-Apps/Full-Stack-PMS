package com.ancientstudents.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class LeaveRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "Employee_id", referencedColumnName = "id")
    private AssignPosition employee;

    private String reason;

    private String dateOfLeave;
    
    private String dateOfEnd;
    
    private String status;
    
    private String comment;
    
    private String created_at;

    public LeaveRequest() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public AssignPosition getEmployee() {
        return employee;
    }

    public void setEmployee(AssignPosition employee) {
        this.employee = employee;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public String getDateOfLeave() {
        return dateOfLeave;
    }

    public void setDateOfLeave(String dateOfLeave) {
        this.dateOfLeave = dateOfLeave;
    }

    public String getDateOfEnd() {
        return dateOfEnd;
    }

    public void setDateOfEnd(String dateOfEnd) {
        this.dateOfEnd = dateOfEnd;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public String getCreated_at() {
        return created_at;
    }

    public void setCreated_at(String created_at) {
        this.created_at = created_at;
    }

    @Override
    public String toString() {
        return "{" +
            " id='" + getId() + "'" +
            ", employee='" + getEmployee() + "'" +
            ", reason='" + getReason() + "'" +
            ", dateOfLeave='" + getDateOfLeave() + "'" +
            ", dateOfEnd='" + getDateOfEnd() + "'" +
            ", status='" + getStatus() + "'" +
            ", comment='" + getComment() + "'" +
            ", created_at='" + getCreated_at() + "'" +
            "}";
    }

}



