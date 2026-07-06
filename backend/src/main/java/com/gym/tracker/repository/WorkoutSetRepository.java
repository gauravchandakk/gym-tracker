package com.gym.tracker.repository;

import com.gym.tracker.model.WorkoutSet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface WorkoutSetRepository extends JpaRepository<WorkoutSet, Long> {

    @Query("select coalesce(sum(s.reps * coalesce(s.weight, 0.0)), 0.0) from WorkoutSet s")
    Double calculateTotalVolume();
}
