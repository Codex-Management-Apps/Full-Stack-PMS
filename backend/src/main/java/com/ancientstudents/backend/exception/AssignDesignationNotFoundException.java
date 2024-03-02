
package com.ancientstudents.backend.exception;

public class AssignDesignationNotFoundException extends RuntimeException{
    public AssignDesignationNotFoundException(Long id){
        super("Could not find the AssignDesstination with id " + id);
    }
}
