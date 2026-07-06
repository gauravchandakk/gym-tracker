package com.gym.tracker.controller;

import com.gym.tracker.dto.ExerciseRequestDTO;
import com.gym.tracker.dto.ExerciseResponseDTO;
import com.gym.tracker.service.ExerciseService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/exercises")
@CrossOrigin(origins = {"http://localhost:5174", "http://localhost:5173"})
@RequiredArgsConstructor
@Tag(name = "Exercise Library API", description = "APIs for the reusable exercise library")
public class ExerciseController {

    private final ExerciseService exerciseService;

    @Operation(summary = "Get all exercises")
    @GetMapping
    public ResponseEntity<List<ExerciseResponseDTO>> getAllExercises() {
        return ResponseEntity.ok(exerciseService.getAllExercises());
    }

    @Operation(summary = "Get exercise by id")
    @GetMapping("/{id}")
    public ResponseEntity<ExerciseResponseDTO> getExerciseById(@PathVariable Long id) {
        return ResponseEntity.ok(exerciseService.getExerciseById(id));
    }

    @Operation(summary = "Get exercises by muscle group")
    @GetMapping("/muscle/{muscle}")
    public ResponseEntity<List<ExerciseResponseDTO>> getExercisesByMuscleGroup(@PathVariable String muscle) {
        return ResponseEntity.ok(exerciseService.getExercisesByMuscleGroup(muscle));
    }

    @Operation(summary = "Search exercises by name")
    @GetMapping("/search")
    public ResponseEntity<List<ExerciseResponseDTO>> searchExercises(@RequestParam String name) {
        return ResponseEntity.ok(exerciseService.searchExercisesByName(name));
    }

    @Operation(summary = "Add custom exercise")
    @PostMapping
    public ResponseEntity<ExerciseResponseDTO> createExercise(@Valid @RequestBody ExerciseRequestDTO requestDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(exerciseService.createExercise(requestDTO));
    }
}
