package com.ancientstudents.backend.exception;

public class PostNotFoundException extends RuntimeException{
    public PostNotFoundException(Long id){
        super("Could not find the user with id " + id);
    }
}
