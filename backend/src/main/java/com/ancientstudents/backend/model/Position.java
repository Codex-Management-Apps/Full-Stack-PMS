package com.ancientstudents.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Position {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="positionName")
    private String positionName;

    public Position() {
    }

    public Position(Long id, String positionName) {
        this.id = id;
        this.positionName = positionName;
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPositionName() {
        return this.positionName;
    }

    public void setPositionName(String positionName) {
        this.positionName = positionName;
    }

    public Position id(Long id) {
        setId(id);
        return this;
    }

    public Position positionName(String positionName) {
        setPositionName(positionName);
        return this;
    }

}
