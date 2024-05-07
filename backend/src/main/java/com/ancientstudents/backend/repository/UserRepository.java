package com.ancientstudents.backend.repository;

import com.ancientstudents.backend.model.User;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserRepository extends JpaRepository<User, Long> {

    @Query(value = "select * from user where email= ?1", nativeQuery = true)
    Optional<User> findByEmail(String email);
}
