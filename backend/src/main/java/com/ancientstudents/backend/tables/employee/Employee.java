package com.ancientstudents.backend.tables.employee;

import java.util.Date;

import com.ancientstudents.backend.tables.department.Department;
import com.ancientstudents.backend.tables.designation.Designation;
import com.ancientstudents.backend.tables.employeeData.EmployeeData;
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
import lombok.Data;

@Entity
@Data
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="emp_num")
    private String empNum;

    @ManyToOne
    @JoinColumn(name="department_id", referencedColumnName = "id")
    private Department department;

    @ManyToOne
    @JoinColumn(name="designation_id", referencedColumnName = "id")
    private Designation designation;

    @ManyToOne
    @JoinColumn(name="employeedata_id", referencedColumnName = "id")
    private EmployeeData employeeData;

    private String employeeType;
    private String status;

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

}   
