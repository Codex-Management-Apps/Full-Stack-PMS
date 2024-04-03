package com.ancientstudents.backend.model;


import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class AssignPosition {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    // This is employee with inclusion of a designation
    @ManyToOne
    @JoinColumn(name = "assign_designation_id", referencedColumnName = "id")
    private AssignDesignation employee;

    @ManyToOne
    @JoinColumn(name = "position_id", referencedColumnName = "id")
    private Position position;

    @ManyToOne
    @JoinColumn(name = "superior_id", referencedColumnName = "id")     
    private Signatory superior;

    @Column(name = "created_at")
    private String created_at;


    public AssignPosition() {
    }

    public AssignPosition(Long id, AssignDesignation Employee, Position position, Signatory superior,String Created_at) {
        this.id = id;
        this.employee = Employee;
        this.position = position;
        this.superior = superior;
        this.created_at = Created_at;
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public AssignDesignation getEmployee() {
        return this.employee;
    }

    public void setEmployee(AssignDesignation Employee) {
        this.employee = Employee;
    }

    public Position getPosition() {
        return this.position;
    }

    public void setPosition(Position position) {
        this.position = position;
    }

    public Signatory getSuperior(){
        return superior;
    }

    public void setSuperior(Signatory superior){
        this.superior = superior;
    }

    public String getCreated_at() {
        return this.created_at;
    }

    public void setCreated_at(String Created_at) {
        this.created_at = Created_at;
    }

    public AssignPosition id(Long id) {
        setId(id);
        return this;
    }

    public AssignPosition Employee(AssignDesignation Employee) {
        setEmployee(Employee);
        return this;
    }

    public AssignPosition position(Position position) {
        setPosition(position);
        return this;
    }

    public AssignPosition Created_at(String Created_at) {
        setCreated_at(Created_at);
        return this;
    }

    @Override
    public String toString() {
        return "{" +
            " id='" + getId() + "'" +
            ", employee='" + getEmployee() + "'" +
            ", position='" + getPosition() + "'" +
            ", superior='" + getSuperior() + "'" +
            ", created_at='" + getCreated_at() + "'" +
            "}";
    }

}
