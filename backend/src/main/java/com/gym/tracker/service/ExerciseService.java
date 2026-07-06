package com.gym.tracker.service;

import com.gym.tracker.dto.ExerciseRequestDTO;
import com.gym.tracker.dto.ExerciseResponseDTO;
import java.util.List;

/**
 * Service contract that defines exercise library operations.
 */
public interface ExerciseService {

    List<ExerciseResponseDTO> getAllExercises();

    ExerciseResponseDTO getExerciseById(Long id);

    List<ExerciseResponseDTO> getExercisesByMuscleGroup(String muscleGroup);

    List<ExerciseResponseDTO> searchExercisesByName(String name);

    ExerciseResponseDTO createExercise(ExerciseRequestDTO requestDTO);
}
