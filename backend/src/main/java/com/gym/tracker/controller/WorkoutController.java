package com.gym.tracker.controller;

import com.gym.tracker.dto.StatsDTO;
import com.gym.tracker.dto.WorkoutRequestDTO;
import com.gym.tracker.dto.WorkoutResponseDTO;
import com.gym.tracker.service.WorkoutService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import java.time.LocalDate;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/workouts")
@CrossOrigin(origins = {"http://localhost:5174", "http://localhost:5173"})
@RequiredArgsConstructor
@Tag(name = "Workout API", description = "APIs for workout sessions")
public class WorkoutController {

    private final WorkoutService workoutService;

    @Operation(summary = "Get all workouts")
    @GetMapping
    public ResponseEntity<List<WorkoutResponseDTO>> getAllWorkouts() {
        return ResponseEntity.ok(workoutService.getAllWorkouts());
    }

    @Operation(summary = "Get workout by id")
    @GetMapping("/{id}")
    public ResponseEntity<WorkoutResponseDTO> getWorkoutById(@PathVariable Long id) {
        return ResponseEntity.ok(workoutService.getWorkoutById(id));
    }

    @Operation(summary = "Get workouts by date")
    @GetMapping("/date/{date}")
    public ResponseEntity<List<WorkoutResponseDTO>> getWorkoutsByDate(
            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date
    ) {
        return ResponseEntity.ok(workoutService.getWorkoutsByDate(date));
    }

    @Operation(summary = "Get workout stats")
    @GetMapping("/stats")
    public ResponseEntity<StatsDTO> getStats() {
        return ResponseEntity.ok(workoutService.getStats());
    }

    @Operation(summary = "Create workout")
    @PostMapping
    public ResponseEntity<WorkoutResponseDTO> createWorkout(@Valid @RequestBody WorkoutRequestDTO requestDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(workoutService.createWorkout(requestDTO));
    }

    @Operation(summary = "Update workout")
    @PutMapping("/{id}")
    public ResponseEntity<WorkoutResponseDTO> updateWorkout(
            @PathVariable Long id,
            @Valid @RequestBody WorkoutRequestDTO requestDTO
    ) {
        return ResponseEntity.ok(workoutService.updateWorkout(id, requestDTO));
    }

    @Operation(summary = "Delete workout")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteWorkout(@PathVariable Long id) {
        workoutService.deleteWorkout(id);
        return ResponseEntity.noContent().build();
    }
}
