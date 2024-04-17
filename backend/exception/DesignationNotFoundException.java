package com.ancientstudents.backend.exception;

public class DesignationNotFoundException extends RuntimeException{
    public DesignationNotFoundException(Long id){
        super("Could not find the designation with id " + id);
    }
}
