package com.gym.tracker.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Request DTO that carries validated exercise data from API clients.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ExerciseRequestDTO {

    @NotBlank(message = "Exercise name is required")
    private String exerciseName;

    private String muscleGroup;

    @NotNull(message = "Sets are required")
    @Min(value = 1, message = "Sets must be at least 1")
    private Integer sets;

    private String reps;

    private Double weight;

    private String notes;

    private LocalDate date;
}
