package com.gym.tracker.service;

import com.gym.tracker.dto.SetRequestDTO;
import com.gym.tracker.dto.SetResponseDTO;
import com.gym.tracker.dto.SetUpdateRequestDTO;
import com.gym.tracker.exception.ResourceNotFoundException;
import com.gym.tracker.model.WorkoutExercise;
import com.gym.tracker.model.WorkoutSet;
import com.gym.tracker.repository.WorkoutExerciseRepository;
import com.gym.tracker.repository.WorkoutSetRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class SetServiceImpl implements SetService {

    private final WorkoutSetRepository workoutSetRepository;
    private final WorkoutExerciseRepository workoutExerciseRepository;

    @Override
    @Transactional
    public SetResponseDTO addSet(SetRequestDTO requestDTO) {
        WorkoutExercise workoutExercise = workoutExerciseRepository.findById(requestDTO.getWorkoutExerciseId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Workout exercise not found with id: " + requestDTO.getWorkoutExerciseId()));

        WorkoutSet workoutSet = WorkoutSet.builder()
                .workoutExercise(workoutExercise)
                .setNumber(requestDTO.getSetNumber())
                .reps(requestDTO.getReps())
                .weight(requestDTO.getWeight())
                .completed(requestDTO.getCompleted() != null && requestDTO.getCompleted())
                .build();
        return mapToResponseDTO(workoutSetRepository.save(workoutSet));
    }

    @Override
    @Transactional
    public SetResponseDTO updateSet(Long id, SetUpdateRequestDTO requestDTO) {
        WorkoutSet workoutSet = findSetById(id);
        workoutSet.setReps(requestDTO.getReps());
        workoutSet.setWeight(requestDTO.getWeight());
        if (requestDTO.getCompleted() != null) {
            workoutSet.setCompleted(requestDTO.getCompleted());
        }
        return mapToResponseDTO(workoutSet);
    }

    @Override
    @Transactional
    public void deleteSet(Long id) {
        WorkoutSet workoutSet = findSetById(id);
        workoutSetRepository.delete(workoutSet);
    }

    private WorkoutSet findSetById(Long id) {
        return workoutSetRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Set not found with id: " + id));
    }

    private SetResponseDTO mapToResponseDTO(WorkoutSet workoutSet) {
        return SetResponseDTO.builder()
                .id(workoutSet.getId())
                .setNumber(workoutSet.getSetNumber())
                .reps(workoutSet.getReps())
                .weight(workoutSet.getWeight())
                .completed(workoutSet.getCompleted())
                .build();
    }
}
