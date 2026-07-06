package com.gym.tracker.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WorkoutExerciseResponseDTO {

    private Long id;
    private Long exerciseId;
    private String exerciseName;
    private String muscleGroup;
    private String equipment;
    private String notes;
    private List<SetResponseDTO> sets;
}
