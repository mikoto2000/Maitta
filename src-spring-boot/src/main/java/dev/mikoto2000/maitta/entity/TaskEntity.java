package dev.mikoto2000.maitta.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.util.ArrayList;
import java.util.List;

/**
 * Task table entity.
 */
@Entity
@Table(name = "task")
public class TaskEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "task_name", nullable = false)
  private String taskName;

  @Column(name = "display_number", nullable = false)
  private Integer displayNumber;

  @OneToMany(
      mappedBy = "task",
      cascade = CascadeType.ALL,
      orphanRemoval = true,
      fetch = FetchType.LAZY)
  private List<TaskHistoryEntity> histories = new ArrayList<>();

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getTaskName() {
    return taskName;
  }

  public void setTaskName(String taskName) {
    this.taskName = taskName;
  }

  public Integer getDisplayNumber() {
    return displayNumber;
  }

  public void setDisplayNumber(Integer displayNumber) {
    this.displayNumber = displayNumber;
  }

  public List<TaskHistoryEntity> getHistories() {
    return histories;
  }

  public void setHistories(List<TaskHistoryEntity> histories) {
    this.histories = histories;
  }
}
