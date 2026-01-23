package dev.mikoto2000.maitta.repository;

import dev.mikoto2000.maitta.entity.TaskEntity;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Repository for task table.
 */
public interface TaskRepository extends JpaRepository<TaskEntity, Long> {
}
