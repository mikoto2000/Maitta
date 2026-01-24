package dev.mikoto2000.maitta.service;

import dev.mikoto2000.maitta.entity.TaskEntity;
import dev.mikoto2000.maitta.entity.TaskHistoryEntity;
import dev.mikoto2000.maitta.repository.TaskHistoryRepository;
import dev.mikoto2000.maitta.repository.TaskRepository;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

/**
 * TaskService
 */
@Service
public class TaskService {
  private final TaskRepository taskRepository;
  private final TaskHistoryRepository taskHistoryRepository;

  /**
   * Constructor
   */
  public TaskService(TaskRepository taskRepository, TaskHistoryRepository taskHistoryRepository) {
    this.taskRepository = taskRepository;
    this.taskHistoryRepository = taskHistoryRepository;
  }

  @Transactional(readOnly = true)
  public List<TaskInfo> getAllTasks(String ownerLogin) {
    return taskRepository.findByOwnerLogin(ownerLogin).stream()
        .map(this::toTaskInfo)
        .collect(Collectors.toList());
  }

  @Transactional(readOnly = true)
  public TaskInfo getTaskById(long id, String ownerLogin) {
    TaskEntity task = taskRepository.findByIdAndOwnerLogin(id, ownerLogin)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Task not found"));
    return toTaskInfo(task);
  }

  @Transactional
  public void executeTask(long id, String ownerLogin) {
    TaskEntity task = taskRepository.findByIdAndOwnerLogin(id, ownerLogin)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Task not found"));
    TaskHistoryEntity history = new TaskHistoryEntity();
    history.setTask(task);
    history.setDatetime(OffsetDateTime.now(ZoneOffset.UTC));
    taskHistoryRepository.save(history);
  }

  @Transactional
  public void deleteTask(long id, String ownerLogin) {
    TaskEntity task = taskRepository.findByIdAndOwnerLogin(id, ownerLogin)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Task not found"));
    taskRepository.delete(task);
  }

  @Transactional
  public long createTask(String taskName, int displayNumber, String ownerLogin) {
    TaskEntity task = new TaskEntity();
    task.setTaskName(taskName);
    task.setDisplayNumber(displayNumber);
    task.setOwnerLogin(ownerLogin);
    return taskRepository.save(task).getId();
  }

  @Transactional
  public void updateTask(long id, String taskName, int displayNumber, String ownerLogin) {
    TaskEntity task = taskRepository.findByIdAndOwnerLogin(id, ownerLogin)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Task not found"));
    task.setTaskName(taskName);
    task.setDisplayNumber(displayNumber);
    taskRepository.save(task);
  }

  private TaskInfo toTaskInfo(TaskEntity task) {
    List<String> history = taskHistoryRepository
        .findByTask_IdOrderByDatetimeDesc(task.getId()).stream()
        .map(TaskHistoryEntity::getDatetime)
        .map(OffsetDateTime::toString)
        .collect(Collectors.toList());
    return new TaskInfo(
        task.getId(),
        task.getTaskName(),
        Optional.ofNullable(task.getDisplayNumber()).orElse(0),
        history);
  }

  public record TaskInfo(long id, String name, int displayNumber, List<String> history) {
  }
}
