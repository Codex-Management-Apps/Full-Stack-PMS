
package com.ancientstudents.backend.exception;

public class PayrollNotFoundException extends RuntimeException{
    public PayrollNotFoundException(Long id){
        super("Could not find the payroll with id " + id);
    }
}
