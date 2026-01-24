package dev.mikoto2000.maitta.repository;

import dev.mikoto2000.maitta.entity.TaskEntity;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Repository for task table.
 */
public interface TaskRepository extends JpaRepository<TaskEntity, Long> {
  List<TaskEntity> findByOwnerLogin(String ownerLogin);

  Optional<TaskEntity> findByIdAndOwnerLogin(Long id, String ownerLogin);
}
