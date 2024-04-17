package com.ancientstudents.backend.model;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Deduction {
    @Id
    @GeneratedValue
    private Long id;
    private String contribution_type;
    private String amount;


    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContribution_type() {
        return this.contribution_type;
    }

    public void setContribution_type(String contribution_type) {
        this.contribution_type = contribution_type;
    }

    public String getAmount() {
        return this.amount;
    }

    public void setAmount(String amount) {
        this.amount = amount;
    }

}
