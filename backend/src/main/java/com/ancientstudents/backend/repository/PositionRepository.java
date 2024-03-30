package com.ancientstudents.backend.repository;

import com.ancientstudents.backend.model.Position;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PositionRepository extends JpaRepository<Position, Long> {
}
