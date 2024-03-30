package com.ancientstudents.backend.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Signatory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "in_charge", referencedColumnName = "id")     
    private AssignPosition inCharge;

    private String status;

    public Signatory() {
        
    }

    public Signatory(Long id, AssignPosition inCharge, String status) {
        this.id = id;
        this.inCharge = inCharge;
        this.status = status;
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public AssignPosition getSuperior() {
        return this.inCharge;
    }

    public void setSuperior(AssignPosition inCharge) {
        this.inCharge = inCharge;
    }

    public String getStatus() {
        return this.status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Signatory id(Long id) {
        setId(id);
        return this;
    }

    public Signatory Superior(AssignPosition Superior) {
        setSuperior(Superior);
        return this;
    }

    public Signatory status(String status) {
        setStatus(status);
        return this;
    }

    @Override
    public String toString() {
        return "{" +
            " id='" + getId() + "'" +
            ", Superior='" + getSuperior() + "'" +
            ", status='" + getStatus() + "'" +
            "}";
    }

}



