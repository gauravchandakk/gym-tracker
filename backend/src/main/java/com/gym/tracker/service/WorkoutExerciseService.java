package com.gym.tracker.service;

import com.gym.tracker.dto.WorkoutExerciseRequestDTO;
import com.gym.tracker.dto.WorkoutExerciseResponseDTO;

public interface WorkoutExerciseService {

    WorkoutExerciseResponseDTO addExerciseToWorkout(WorkoutExerciseRequestDTO requestDTO);

    void removeExerciseFromWorkout(Long id);
}
