package com.gym.tracker.repository;

import com.gym.tracker.model.Workout;
import java.time.LocalDate;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface WorkoutRepository extends JpaRepository<Workout, Long> {

    List<Workout> findAllByOrderByWorkoutDateDescIdDesc();

    List<Workout> findByWorkoutDateOrderByIdAsc(LocalDate workoutDate);

    @Query("select distinct w.workoutDate from Workout w order by w.workoutDate desc")
    List<LocalDate> findDistinctWorkoutDatesDesc();
}
