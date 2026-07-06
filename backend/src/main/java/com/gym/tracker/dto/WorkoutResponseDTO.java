package com.gym.tracker.dto;

import java.time.LocalDate;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WorkoutResponseDTO {

    private Long id;
    private LocalDate workoutDate;
    private String title;
    private String notes;
    private List<WorkoutExerciseResponseDTO> exercises;
}
