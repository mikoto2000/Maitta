package dev.mikoto2000.maitta.controller;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import dev.mikoto2000.maitta.service.TaskService;

/**
 * Controller template for requests issued from src/services/Services.ts.
 */
@RestController
@RequestMapping("/api")
public class TaskController {
  private final TaskService taskService;

  public TaskController(TaskService taskService) {
    this.taskService = taskService;
  }

  /**
   * GET /api/settings/display-mode
   */
  @GetMapping("/settings/display-mode")
  public ResponseEntity<DisplayModeResponse> getDisplayMode() {
    return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).build();
  }

  /**
   * PUT /api/settings/display-mode
   */
  @PutMapping("/settings/display-mode")
  public ResponseEntity<Void> saveDisplayMode(@RequestBody DisplayModeRequest request) {
    return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).build();
  }

  /**
   * GET /api/tasks
   */
  @GetMapping("/tasks")
  public ResponseEntity<List<TaskInfoResponse>> getAllTasks() {
    List<TaskInfoResponse> tasks = taskService.getAllTasks().stream()
        .map(this::toTaskInfoResponse)
        .collect(Collectors.toList());
    return ResponseEntity.ok(tasks);
  }

  /**
   * GET /api/tasks/{id}
   */
  @GetMapping("/tasks/{id}")
  public ResponseEntity<TaskInfoResponse> getTaskById(@PathVariable("id") long id) {
    return ResponseEntity.ok(toTaskInfoResponse(taskService.getTaskById(id)));
  }

  /**
   * POST /api/tasks/{id}/execute
   */
  @PostMapping("/tasks/{id}/execute")
  public ResponseEntity<Map<String, Object>> executeTask(@PathVariable("id") long id) {
    taskService.executeTask(id);
    return ResponseEntity.ok(Collections.emptyMap());
  }

  /**
   * DELETE /api/tasks/{id}
   */
  @DeleteMapping("/tasks/{id}")
  public ResponseEntity<Void> deleteTask(@PathVariable("id") long id) {
    taskService.deleteTask(id);
    return ResponseEntity.noContent().build();
  }

  /**
   * POST /api/tasks
   */
  @PostMapping("/tasks")
  public ResponseEntity<CreateTaskResponse> createTask(@RequestBody CreateTaskRequest request) {
    long id = taskService.createTask(request.taskName(), request.displayNumber());
    return ResponseEntity.status(HttpStatus.CREATED).body(new CreateTaskResponse(id));
  }

  /**
   * PUT /api/tasks/{id}
   */
  @PutMapping("/tasks/{id}")
  public ResponseEntity<Void> updateTask(
      @PathVariable("id") long id,
      @RequestBody UpdateTaskRequest request) {
    taskService.updateTask(id, request.taskName(), request.displayNumber());
    return ResponseEntity.noContent().build();
  }

  public record DisplayModeRequest(String mode) {
  }

  public record DisplayModeResponse(String mode) {
  }

  public record CreateTaskRequest(String taskName, int displayNumber) {
  }

  public record UpdateTaskRequest(String taskName, int displayNumber) {
  }

  public record CreateTaskResponse(long id) {
  }

  public record TaskInfoResponse(
      long id,
      String name,
      int displayNumber,
      List<String> history) {
  }

  private TaskInfoResponse toTaskInfoResponse(TaskService.TaskInfo info) {
    return new TaskInfoResponse(
        info.id(),
        info.name(),
        info.displayNumber(),
        info.history());
  }
}
