
package com.ancientstudents.backend.exception;

public class AddEarningsNotFoundException extends RuntimeException{
    public AddEarningsNotFoundException(Long id){
        super("Could not find the addEarnings with id " + id);
    }
}
