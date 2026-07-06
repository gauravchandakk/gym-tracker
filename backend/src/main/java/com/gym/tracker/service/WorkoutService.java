package com.gym.tracker.service;

import com.gym.tracker.dto.StatsDTO;
import com.gym.tracker.dto.WorkoutRequestDTO;
import com.gym.tracker.dto.WorkoutResponseDTO;
import java.time.LocalDate;
import java.util.List;

public interface WorkoutService {

    List<WorkoutResponseDTO> getAllWorkouts();

    WorkoutResponseDTO getWorkoutById(Long id);

    List<WorkoutResponseDTO> getWorkoutsByDate(LocalDate date);

    StatsDTO getStats();

    WorkoutResponseDTO createWorkout(WorkoutRequestDTO requestDTO);

    WorkoutResponseDTO updateWorkout(Long id, WorkoutRequestDTO requestDTO);

    void deleteWorkout(Long id);
}
