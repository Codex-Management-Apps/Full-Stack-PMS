
package com.ancientstudents.backend.exception;

public class DeductionNotFoundException extends RuntimeException{
    public DeductionNotFoundException(Long id){
        super("Could not find the deduction with id " + id);
    }
}
