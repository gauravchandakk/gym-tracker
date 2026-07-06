package com.gym.tracker.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SetResponseDTO {

    private Long id;
    private Integer setNumber;
    private Integer reps;
    private Double weight;
    private Boolean completed;
}
