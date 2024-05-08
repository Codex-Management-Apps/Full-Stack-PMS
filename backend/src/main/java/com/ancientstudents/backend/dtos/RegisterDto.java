package com.ancientstudents.backend.dtos;

import lombok.Data;

@Data
public class RegisterDto {
    private String username;
    private String password; 
    private String email;
    private String department;
}
