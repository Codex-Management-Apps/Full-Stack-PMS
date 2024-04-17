package com.ancientstudents.backend.exception;

public class LeaveRequestNotFoundException extends RuntimeException{
    public LeaveRequestNotFoundException(Long id){
        super("Could not find the leaveRequest with id " + id);
    }
}
