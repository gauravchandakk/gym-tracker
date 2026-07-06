package com.gym.tracker.service;

import com.gym.tracker.dto.SetResponseDTO;
import com.gym.tracker.dto.WorkoutExerciseRequestDTO;
import com.gym.tracker.dto.WorkoutExerciseResponseDTO;
import com.gym.tracker.exception.ResourceNotFoundException;
import com.gym.tracker.model.Exercise;
import com.gym.tracker.model.Workout;
import com.gym.tracker.model.WorkoutExercise;
import com.gym.tracker.model.WorkoutSet;
import com.gym.tracker.repository.ExerciseRepository;
import com.gym.tracker.repository.WorkoutExerciseRepository;
import com.gym.tracker.repository.WorkoutRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class WorkoutExerciseServiceImpl implements WorkoutExerciseService {

    private final WorkoutExerciseRepository workoutExerciseRepository;
    private final WorkoutRepository workoutRepository;
    private final ExerciseRepository exerciseRepository;

    @Override
    @Transactional
    public WorkoutExerciseResponseDTO addExerciseToWorkout(WorkoutExerciseRequestDTO requestDTO) {
        Workout workout = workoutRepository.findById(requestDTO.getWorkoutId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Workout not found with id: " + requestDTO.getWorkoutId()));
        Exercise exercise = exerciseRepository.findById(requestDTO.getExerciseId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Exercise not found with id: " + requestDTO.getExerciseId()));

        WorkoutExercise workoutExercise = WorkoutExercise.builder()
                .workout(workout)
                .exercise(exercise)
                .notes(requestDTO.getNotes())
                .build();
        return mapToResponseDTO(workoutExerciseRepository.save(workoutExercise));
    }

    @Override
    @Transactional
    public void removeExerciseFromWorkout(Long id) {
        WorkoutExercise workoutExercise = workoutExerciseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Workout exercise not found with id: " + id));
        workoutExerciseRepository.delete(workoutExercise);
    }

    private WorkoutExerciseResponseDTO mapToResponseDTO(WorkoutExercise workoutExercise) {
        Exercise exercise = workoutExercise.getExercise();
        return WorkoutExerciseResponseDTO.builder()
                .id(workoutExercise.getId())
                .exerciseId(exercise.getId())
                .exerciseName(exercise.getName())
                .muscleGroup(exercise.getMuscleGroup())
                .equipment(exercise.getEquipment())
                .notes(workoutExercise.getNotes())
                .sets(workoutExercise.getSets()
                        .stream()
                        .map(this::mapSetToResponseDTO)
                        .toList())
                .build();
    }

    private SetResponseDTO mapSetToResponseDTO(WorkoutSet workoutSet) {
        return SetResponseDTO.builder()
                .id(workoutSet.getId())
                .setNumber(workoutSet.getSetNumber())
                .reps(workoutSet.getReps())
                .weight(workoutSet.getWeight())
                .completed(workoutSet.getCompleted())
                .build();
    }
}
