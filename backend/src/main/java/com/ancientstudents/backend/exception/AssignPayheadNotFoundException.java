package com.ancientstudents.backend.exception;

public class AssignPayheadNotFoundException extends RuntimeException{
    public AssignPayheadNotFoundException(Long id){
        super("Could not find the Assign Payhead with id " + id);
    }
}
