package com.ancientstudents.backend.repository;

import com.ancientstudents.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
