package com.gym.tracker.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SetUpdateRequestDTO {

    @NotNull(message = "Reps are required")
    @Min(value = 0, message = "Reps cannot be negative")
    private Integer reps;

    private Double weight;

    private Boolean completed;
}
