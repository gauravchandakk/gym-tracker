package com.gym.tracker.service;

import com.gym.tracker.dto.ExerciseRequestDTO;
import com.gym.tracker.dto.ExerciseResponseDTO;
import com.gym.tracker.exception.ResourceNotFoundException;
import com.gym.tracker.model.Exercise;
import com.gym.tracker.repository.ExerciseRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service implementation that applies business logic and maps between entities and DTOs.
 */
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ExerciseServiceImpl implements ExerciseService {

    private final ExerciseRepository exerciseRepository;

    @Override
    public List<ExerciseResponseDTO> getAllExercises() {
        return exerciseRepository.findAll()
                .stream()
                .map(this::mapToResponseDTO)
                .toList();
    }

    @Override
    public ExerciseResponseDTO getExerciseById(Long id) {
        Exercise exercise = findExerciseById(id);
        return mapToResponseDTO(exercise);
    }

    @Override
    public List<ExerciseResponseDTO> getExercisesByMuscleGroup(String muscleGroup) {
        return exerciseRepository.findByMuscleGroupIgnoreCase(muscleGroup)
                .stream()
                .map(this::mapToResponseDTO)
                .toList();
    }

    @Override
    public List<ExerciseResponseDTO> searchExercisesByName(String name) {
        return exerciseRepository.findByNameContainingIgnoreCase(name)
                .stream()
                .map(this::mapToResponseDTO)
                .toList();
    }

    @Override
    @Transactional
    public ExerciseResponseDTO createExercise(ExerciseRequestDTO requestDTO) {
        Exercise exercise = Exercise.builder()
                .name(requestDTO.getName())
                .muscleGroup(requestDTO.getMuscleGroup())
                .equipment(requestDTO.getEquipment())
                .description(requestDTO.getDescription())
                .build();
        Exercise savedExercise = exerciseRepository.save(exercise);
        return mapToResponseDTO(savedExercise);
    }

    private Exercise findExerciseById(Long id) {
        return exerciseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Exercise not found with id: " + id));
    }

    private ExerciseResponseDTO mapToResponseDTO(Exercise exercise) {
        return ExerciseResponseDTO.builder()
                .id(exercise.getId())
                .name(exercise.getName())
                .muscleGroup(exercise.getMuscleGroup())
                .equipment(exercise.getEquipment())
                .description(exercise.getDescription())
                .build();
    }
}
