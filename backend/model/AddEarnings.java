package com.ancientstudents.backend.model;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class AddEarnings {
    @Id
    @GeneratedValue
    private Long id;
    private String typeOfEarnings;
    private Double amount;
    private Date date_added;
    

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTypeOfEarnings() {
        return this.typeOfEarnings;
    }

    public void setTypeOfEarnings(String typeOfEarnings) {
        this.typeOfEarnings = typeOfEarnings;
    }

    public Double getAmount() {
        return this.amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public Date getDate_added() {
        return this.date_added;
    }

    public void setDate_added(Date date_added) {
        this.date_added = date_added;
    }

}
