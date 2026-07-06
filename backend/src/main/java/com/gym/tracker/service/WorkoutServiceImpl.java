package com.gym.tracker.service;

import com.gym.tracker.dto.SetResponseDTO;
import com.gym.tracker.dto.StatsDTO;
import com.gym.tracker.dto.WorkoutExerciseResponseDTO;
import com.gym.tracker.dto.WorkoutRequestDTO;
import com.gym.tracker.dto.WorkoutResponseDTO;
import com.gym.tracker.exception.ResourceNotFoundException;
import com.gym.tracker.model.Exercise;
import com.gym.tracker.model.Workout;
import com.gym.tracker.model.WorkoutExercise;
import com.gym.tracker.model.WorkoutSet;
import com.gym.tracker.repository.WorkoutRepository;
import com.gym.tracker.repository.WorkoutSetRepository;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class WorkoutServiceImpl implements WorkoutService {

    private final WorkoutRepository workoutRepository;
    private final WorkoutSetRepository workoutSetRepository;

    @Override
    public List<WorkoutResponseDTO> getAllWorkouts() {
        return workoutRepository.findAllByOrderByWorkoutDateDescIdDesc()
                .stream()
                .map(this::mapToResponseDTO)
                .toList();
    }

    @Override
    public WorkoutResponseDTO getWorkoutById(Long id) {
        return mapToResponseDTO(findWorkoutById(id));
    }

    @Override
    public List<WorkoutResponseDTO> getWorkoutsByDate(LocalDate date) {
        return workoutRepository.findByWorkoutDateOrderByIdAsc(date)
                .stream()
                .map(this::mapToResponseDTO)
                .toList();
    }

    @Override
    public StatsDTO getStats() {
        List<LocalDate> workoutDatesDesc = workoutRepository.findDistinctWorkoutDatesDesc();
        List<LocalDate> workoutDatesAsc = new ArrayList<>(workoutDatesDesc);
        Collections.reverse(workoutDatesAsc);

        return StatsDTO.builder()
                .totalWorkouts(workoutRepository.count())
                .totalSets(workoutSetRepository.count())
                .totalVolume(workoutSetRepository.calculateTotalVolume())
                .currentStreak(calculateCurrentStreak(workoutDatesDesc))
                .workoutDates(workoutDatesAsc)
                .build();
    }

    @Override
    @Transactional
    public WorkoutResponseDTO createWorkout(WorkoutRequestDTO requestDTO) {
        Workout workout = Workout.builder()
                .workoutDate(requestDTO.getWorkoutDate())
                .title(requestDTO.getTitle())
                .notes(requestDTO.getNotes())
                .build();
        return mapToResponseDTO(workoutRepository.save(workout));
    }

    @Override
    @Transactional
    public WorkoutResponseDTO updateWorkout(Long id, WorkoutRequestDTO requestDTO) {
        Workout workout = findWorkoutById(id);
        workout.setWorkoutDate(requestDTO.getWorkoutDate());
        workout.setTitle(requestDTO.getTitle());
        workout.setNotes(requestDTO.getNotes());
        return mapToResponseDTO(workout);
    }

    @Override
    @Transactional
    public void deleteWorkout(Long id) {
        Workout workout = findWorkoutById(id);
        workoutRepository.delete(workout);
    }

    private Workout findWorkoutById(Long id) {
        return workoutRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Workout not found with id: " + id));
    }

    private int calculateCurrentStreak(List<LocalDate> workoutDatesDesc) {
        if (workoutDatesDesc.isEmpty()) {
            return 0;
        }

        int streak = 0;
        LocalDate expectedDate = workoutDatesDesc.get(0);
        for (LocalDate workoutDate : workoutDatesDesc) {
            if (!workoutDate.equals(expectedDate)) {
                break;
            }
            streak++;
            expectedDate = expectedDate.minusDays(1);
        }
        return streak;
    }

    private WorkoutResponseDTO mapToResponseDTO(Workout workout) {
        return WorkoutResponseDTO.builder()
                .id(workout.getId())
                .workoutDate(workout.getWorkoutDate())
                .title(workout.getTitle())
                .notes(workout.getNotes())
                .exercises(workout.getExercises()
                        .stream()
                        .map(this::mapWorkoutExerciseToResponseDTO)
                        .toList())
                .build();
    }

    private WorkoutExerciseResponseDTO mapWorkoutExerciseToResponseDTO(WorkoutExercise workoutExercise) {
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
