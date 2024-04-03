package com.ancientstudents.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import io.github.cdimascio.dotenv.Dotenv;

@SpringBootApplication
public class BackendApplication {
	
	@Bean
	public Dotenv dotenv() {
        return Dotenv.configure().load();
    }
	
	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

}
