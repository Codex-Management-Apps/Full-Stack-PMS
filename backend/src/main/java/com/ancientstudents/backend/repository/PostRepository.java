package com.ancientstudents.backend.repository;

import com.ancientstudents.backend.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Long> {
}
