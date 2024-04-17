package com.ancientstudents.backend.exception;

public class EmployeeNotFoundException extends RuntimeException{
    public EmployeeNotFoundException(Long id){
        super("Could not find the employee with id " + id);
    }
}
