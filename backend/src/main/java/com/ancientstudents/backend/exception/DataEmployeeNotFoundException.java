package com.ancientstudents.backend.exception;

public class DataEmployeeNotFoundException extends RuntimeException{
    public DataEmployeeNotFoundException(Long id){
        super("Could not find the Data Employee with id " + id);
    }
}
