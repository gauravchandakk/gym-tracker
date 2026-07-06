package com.gym.tracker.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WorkoutRequestDTO {

    @NotNull(message = "Workout date is required")
    private LocalDate workoutDate;

    @NotBlank(message = "Title is required")
    private String title;

    private String notes;
}
