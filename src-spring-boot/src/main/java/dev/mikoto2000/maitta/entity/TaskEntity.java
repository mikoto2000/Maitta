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
import lombok.Getter;
import lombok.Setter;

/**
 * Task table entity.
 */
@Entity
@Table(name = "task")
@Getter
@Setter
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
}
