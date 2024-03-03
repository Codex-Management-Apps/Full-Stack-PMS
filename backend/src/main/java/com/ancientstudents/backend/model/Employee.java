package com.ancientstudents.backend.model;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String emp_num;
    private String firstname;
    private String middlename;
    private String lastname;
    private String address_line;
    private String barangay;
    private String province;
    private String country;

    @Column(name = "lastUpdate")
    private String lastUpdate;
    
    public Employee(){
    }

    public Employee(Long id, String emp_num, String firstname, String middlename, String lastname, String address_line, String barangay, String province, String country, String lastUpdate) {
        this.id = id;
        this.emp_num = emp_num;
        this.firstname = firstname;
        this.middlename = middlename;
        this.lastname = lastname;
        this.address_line = address_line;
        this.barangay = barangay;
        this.province = province;
        this.country = country;
        this.lastUpdate = lastUpdate;
    }
    public Employee(Long id) {
        this.id = id;
    }
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmp_num() {
        return emp_num;
    }

    public void setEmp_num(String emp_num) {
        this.emp_num = emp_num;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getMiddlename() {
        return middlename;
    }

    public void setMiddlename(String middlename) {
        this.middlename = middlename;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getAddress_line() {
        return address_line;
    }

    public void setAddress_line(String address_line) {
        this.address_line = address_line;
    }

    public String getBarangay() {
        return barangay;
    }

    public void setBarangay(String barangay) {
        this.barangay = barangay;
    }

    public String getProvince() {
        return province;
    }

    public void setProvince(String province) {
        this.province = province;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getLastUpdate(){
        return lastUpdate;
    }
    public void setLastUpdate(String lastUpdate){
        this.lastUpdate = lastUpdate;
    }


    @Override
    public String toString() {
        return "{" +
            " id='" + getId() + "'" +
            ", emp_num='" + getEmp_num() + "'" +
            ", firstname='" + getFirstname() + "'" +
            ", middlename='" + getMiddlename() + "'" +
            ", lastname='" + getLastname() + "'" +
            ", address_line='" + getAddress_line() + "'" +
            ", barangay='" + getBarangay() + "'" +
            ", province='" + getProvince() + "'" +
            ", country='" + getCountry() + "'" +
            ", lastUpdate='" + getLastUpdate() + "'" +
            "}";
    }

}
