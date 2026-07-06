package com.gym.tracker.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Request DTO for adding a reusable exercise to the exercise library.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ExerciseRequestDTO {

    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "Muscle group is required")
    private String muscleGroup;

    @NotBlank(message = "Equipment is required")
    private String equipment;

    private String description;
}
