package com.gym.tracker.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Response DTO that exposes exercise library data returned by the REST API.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ExerciseResponseDTO {

    private Long id;
    private String name;
    private String muscleGroup;
    private String equipment;
    private String description;
}
