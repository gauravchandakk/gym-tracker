package com.gym.tracker.service;

import com.gym.tracker.dto.ExerciseRequestDTO;
import com.gym.tracker.dto.ExerciseResponseDTO;
import com.gym.tracker.exception.ResourceNotFoundException;
import com.gym.tracker.model.Exercise;
import com.gym.tracker.repository.ExerciseRepository;
import java.time.LocalDate;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

/**
 * Service implementation that applies business logic and maps between entities and DTOs.
 */
@Service
@RequiredArgsConstructor
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
    public List<ExerciseResponseDTO> getExercisesByDate(LocalDate date) {
        return exerciseRepository.findByDate(date)
                .stream()
                .map(this::mapToResponseDTO)
                .toList();
    }

    @Override
    public List<ExerciseResponseDTO> getExercisesByMuscleGroup(String muscleGroup) {
        return exerciseRepository.findByMuscleGroupIgnoreCase(muscleGroup)
                .stream()
                .map(this::mapToResponseDTO)
                .toList();
    }

    @Override
    public ExerciseResponseDTO createExercise(ExerciseRequestDTO requestDTO) {
        Exercise exercise = mapToEntity(requestDTO);
        Exercise savedExercise = exerciseRepository.save(exercise);
        return mapToResponseDTO(savedExercise);
    }

    @Override
    public ExerciseResponseDTO updateExercise(Long id, ExerciseRequestDTO requestDTO) {
        Exercise exercise = findExerciseById(id);

        exercise.setExerciseName(requestDTO.getExerciseName());
        exercise.setMuscleGroup(requestDTO.getMuscleGroup());
        exercise.setSets(requestDTO.getSets());
        exercise.setReps(requestDTO.getReps());
        exercise.setWeight(requestDTO.getWeight());
        exercise.setNotes(requestDTO.getNotes());
        if (requestDTO.getDate() != null) {
            exercise.setDate(requestDTO.getDate());
        }

        Exercise updatedExercise = exerciseRepository.save(exercise);
        return mapToResponseDTO(updatedExercise);
    }

    @Override
    public void deleteExercise(Long id) {
        Exercise exercise = findExerciseById(id);
        exerciseRepository.delete(exercise);
    }

    private Exercise findExerciseById(Long id) {
        return exerciseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Exercise not found with id: " + id));
    }

    private Exercise mapToEntity(ExerciseRequestDTO requestDTO) {
        return Exercise.builder()
                .exerciseName(requestDTO.getExerciseName())
                .muscleGroup(requestDTO.getMuscleGroup())
                .sets(requestDTO.getSets())
                .reps(requestDTO.getReps())
                .weight(requestDTO.getWeight())
                .notes(requestDTO.getNotes())
                .date(requestDTO.getDate())
                .build();
    }

    private ExerciseResponseDTO mapToResponseDTO(Exercise exercise) {
        return ExerciseResponseDTO.builder()
                .id(exercise.getId())
                .exerciseName(exercise.getExerciseName())
                .muscleGroup(exercise.getMuscleGroup())
                .sets(exercise.getSets())
                .reps(exercise.getReps())
                .weight(exercise.getWeight())
                .notes(exercise.getNotes())
                .date(exercise.getDate())
                .createdAt(exercise.getCreatedAt())
                .updatedAt(exercise.getUpdatedAt())
                .build();
    }
}
