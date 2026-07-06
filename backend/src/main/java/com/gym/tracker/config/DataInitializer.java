package com.gym.tracker.config;

import com.gym.tracker.model.Exercise;
import com.gym.tracker.repository.ExerciseRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final ExerciseRepository exerciseRepository;

    @Override
    public void run(String... args) {
        if (exerciseRepository.count() > 0) {
            return;
        }

        exerciseRepository.saveAll(List.of(
                exercise("Bench Press", "Chest", "Barbell"),
                exercise("Incline Bench Press", "Chest", "Barbell"),
                exercise("Chest Fly", "Chest", "Dumbbell"),
                exercise("Push Up", "Chest", "Bodyweight"),
                exercise("Chest Dip", "Chest", "Bodyweight"),
                exercise("Cable Crossover", "Chest", "Cable"),
                exercise("Pull Up", "Back", "Bodyweight"),
                exercise("Deadlift", "Back", "Barbell"),
                exercise("Bent Over Row", "Back", "Barbell"),
                exercise("Lat Pulldown", "Back", "Cable"),
                exercise("Seated Cable Row", "Back", "Cable"),
                exercise("Overhead Press", "Shoulders", "Barbell"),
                exercise("Lateral Raise", "Shoulders", "Dumbbell"),
                exercise("Front Raise", "Shoulders", "Dumbbell"),
                exercise("Face Pull", "Shoulders", "Cable"),
                exercise("Barbell Curl", "Biceps", "Barbell"),
                exercise("Dumbbell Curl", "Biceps", "Dumbbell"),
                exercise("Hammer Curl", "Biceps", "Dumbbell"),
                exercise("Preacher Curl", "Biceps", "Barbell"),
                exercise("Tricep Pushdown", "Triceps", "Cable"),
                exercise("Skull Crusher", "Triceps", "Barbell"),
                exercise("Overhead Extension", "Triceps", "Dumbbell"),
                exercise("Dips", "Triceps", "Bodyweight"),
                exercise("Squat", "Legs", "Barbell"),
                exercise("Leg Press", "Legs", "Machine"),
                exercise("Leg Extension", "Legs", "Machine"),
                exercise("Leg Curl", "Legs", "Machine"),
                exercise("Calf Raise", "Legs", "Machine"),
                exercise("Romanian Deadlift", "Legs", "Barbell"),
                exercise("Plank", "Core", "Bodyweight"),
                exercise("Crunches", "Core", "Bodyweight"),
                exercise("Leg Raise", "Core", "Bodyweight"),
                exercise("Russian Twist", "Core", "Bodyweight")
        ));
    }

    private Exercise exercise(String name, String muscleGroup, String equipment) {
        return Exercise.builder()
                .name(name)
                .muscleGroup(muscleGroup)
                .equipment(equipment)
                .build();
    }
}
