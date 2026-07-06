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
public class StatsDTO {

    private long totalWorkouts;
    private long totalSets;
    private double totalVolume;
    private int currentStreak;
    private List<LocalDate> workoutDates;
}
