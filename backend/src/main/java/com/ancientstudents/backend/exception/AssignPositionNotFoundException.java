package com.ancientstudents.backend.exception;

public class AssignPositionNotFoundException extends RuntimeException{
    public AssignPositionNotFoundException(Long id){
        super("Could not find the Assign Position with id " + id);
    }
}
