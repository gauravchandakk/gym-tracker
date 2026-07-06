package com.gym.tracker.controller;

import com.gym.tracker.dto.WorkoutExerciseRequestDTO;
import com.gym.tracker.dto.WorkoutExerciseResponseDTO;
import com.gym.tracker.service.WorkoutExerciseService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/workout-exercises")
@CrossOrigin(origins = {"http://localhost:5174", "http://localhost:5173"})
@RequiredArgsConstructor
@Tag(name = "Workout Exercise API", description = "APIs for exercises inside workout sessions")
public class WorkoutExerciseController {

    private final WorkoutExerciseService workoutExerciseService;

    @Operation(summary = "Add exercise to workout")
    @PostMapping
    public ResponseEntity<WorkoutExerciseResponseDTO> addExerciseToWorkout(
            @Valid @RequestBody WorkoutExerciseRequestDTO requestDTO
    ) {
        return ResponseEntity.status(HttpStatus.CREATED).body(workoutExerciseService.addExerciseToWorkout(requestDTO));
    }

    @Operation(summary = "Remove exercise from workout")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removeExerciseFromWorkout(@PathVariable Long id) {
        workoutExerciseService.removeExerciseFromWorkout(id);
        return ResponseEntity.noContent().build();
    }
}
