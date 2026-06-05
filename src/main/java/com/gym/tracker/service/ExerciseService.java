package com.gym.tracker.service;

import com.gym.tracker.dto.ExerciseRequestDTO;
import com.gym.tracker.dto.ExerciseResponseDTO;
import java.time.LocalDate;
import java.util.List;

/**
 * Service contract that defines exercise tracker business operations.
 */
public interface ExerciseService {

    List<ExerciseResponseDTO> getAllExercises();

    ExerciseResponseDTO getExerciseById(Long id);

    List<ExerciseResponseDTO> getExercisesByDate(LocalDate date);

    List<ExerciseResponseDTO> getExercisesByMuscleGroup(String muscleGroup);

    ExerciseResponseDTO createExercise(ExerciseRequestDTO requestDTO);

    ExerciseResponseDTO updateExercise(Long id, ExerciseRequestDTO requestDTO);

    void deleteExercise(Long id);
}
