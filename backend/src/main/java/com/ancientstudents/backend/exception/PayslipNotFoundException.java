
package com.ancientstudents.backend.exception;

public class PayslipNotFoundException extends RuntimeException{
    public PayslipNotFoundException(Long id){
        super("Could not find the payslip with id " + id);
    }
}
