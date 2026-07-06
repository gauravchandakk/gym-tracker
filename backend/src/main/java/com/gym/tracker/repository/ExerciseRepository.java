package com.gym.tracker.repository;

import com.gym.tracker.model.Exercise;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Repository that provides database access methods for exercise library records.
 */
public interface ExerciseRepository extends JpaRepository<Exercise, Long> {

    List<Exercise> findByMuscleGroupIgnoreCase(String muscleGroup);

    List<Exercise> findByNameContainingIgnoreCase(String name);
}
