package com.ancientstudents.backend.exception;

public class SignatoryNotFoundException extends RuntimeException{
    public SignatoryNotFoundException(Long id){
        super("Could not find the signatory with id " + id);
    }
}
