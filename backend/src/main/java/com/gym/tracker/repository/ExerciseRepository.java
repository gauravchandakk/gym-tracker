package com.gym.tracker.repository;

import com.gym.tracker.model.Exercise;
import java.time.LocalDate;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Repository that provides database access methods for exercise records.
 */
public interface ExerciseRepository extends JpaRepository<Exercise, Long> {

    List<Exercise> findByDate(LocalDate date);

    List<Exercise> findByMuscleGroupIgnoreCase(String muscleGroup);
}
