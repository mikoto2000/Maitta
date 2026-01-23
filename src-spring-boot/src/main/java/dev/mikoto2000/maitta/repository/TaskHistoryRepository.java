package dev.mikoto2000.maitta.repository;

import dev.mikoto2000.maitta.entity.TaskHistoryEntity;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Repository for task_history table.
 */
public interface TaskHistoryRepository extends JpaRepository<TaskHistoryEntity, Long> {
  List<TaskHistoryEntity> findByTask_IdOrderByDatetimeDesc(Long taskId);
}
