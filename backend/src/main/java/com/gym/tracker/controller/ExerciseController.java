package com.gym.tracker.controller;

import com.gym.tracker.dto.ExerciseRequestDTO;
import com.gym.tracker.dto.ExerciseResponseDTO;
import com.gym.tracker.service.ExerciseService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
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
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

/**
 * REST controller that exposes exercise tracker endpoints to client applications.
 */

@RestController
@RequestMapping("/api/exercises")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
@Tag(name = "Exercise API", description = "CRUD APIs for daily gym exercise tracking")
public class ExerciseController {

    private final ExerciseService exerciseService;

    @Operation(summary = "Get all exercises", description = "Returns every exercise entry in the tracker.")
    @ApiResponse(responseCode = "200", description = "Exercises retrieved successfully")
    @GetMapping
    public ResponseEntity<List<ExerciseResponseDTO>> getAllExercises() {
        return ResponseEntity.ok(exerciseService.getAllExercises());
    }

    @Operation(summary = "Get exercise by id", description = "Returns a single exercise entry by id.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Exercise retrieved successfully"),
            @ApiResponse(responseCode = "404", description = "Exercise not found")
    })
    @GetMapping("/{id}")
    public ResponseEntity<ExerciseResponseDTO> getExerciseById(@PathVariable Long id) {
        return ResponseEntity.ok(exerciseService.getExerciseById(id));
    }

    @Operation(summary = "Get exercises by date", description = "Returns exercise entries for a yyyy-MM-dd date.")
    @ApiResponse(responseCode = "200", description = "Exercises retrieved successfully")
    @GetMapping("/date/{date}")
    public ResponseEntity<List<ExerciseResponseDTO>> getExercisesByDate(
            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date
    ) {
        return ResponseEntity.ok(exerciseService.getExercisesByDate(date));
    }

    @Operation(summary = "Get exercises by muscle group", description = "Returns exercise entries for a muscle group.")
    @ApiResponse(responseCode = "200", description = "Exercises retrieved successfully")
    @GetMapping("/muscle/{muscleGroup}")
    public ResponseEntity<List<ExerciseResponseDTO>> getExercisesByMuscleGroup(@PathVariable String muscleGroup) {
        return ResponseEntity.ok(exerciseService.getExercisesByMuscleGroup(muscleGroup));
    }

    @Operation(summary = "Create exercise", description = "Creates a new exercise entry.")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Exercise created successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid request body")
    })
    @PostMapping
    public ResponseEntity<ExerciseResponseDTO> createExercise(@Valid @RequestBody ExerciseRequestDTO requestDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(exerciseService.createExercise(requestDTO));
    }

    @Operation(summary = "Update exercise", description = "Updates an existing exercise entry by id.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Exercise updated successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid request body"),
            @ApiResponse(responseCode = "404", description = "Exercise not found")
    })
    @PutMapping("/{id}")
    public ResponseEntity<ExerciseResponseDTO> updateExercise(
            @PathVariable Long id,
            @Valid @RequestBody ExerciseRequestDTO requestDTO
    ) {
        return ResponseEntity.ok(exerciseService.updateExercise(id, requestDTO));
    }

    @Operation(summary = "Delete exercise", description = "Deletes an exercise entry by id.")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "Exercise deleted successfully"),
            @ApiResponse(responseCode = "404", description = "Exercise not found")
    })
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ResponseEntity<Void> deleteExercise(@PathVariable Long id) {
        exerciseService.deleteExercise(id);
        return ResponseEntity.noContent().build();
    }
}
