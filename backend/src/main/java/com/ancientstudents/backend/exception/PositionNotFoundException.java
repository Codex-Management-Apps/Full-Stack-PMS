package com.ancientstudents.backend.exception;

public class PositionNotFoundException extends RuntimeException{
    public PositionNotFoundException(Long id){
        super("Could not find the position with id " + id);
    }
}
