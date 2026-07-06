package com.gym.tracker.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI gymTrackerOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Gym Tracker API")
                        .version("1.0")
                        .description("Spring Boot backend for workout sessions, exercise library, and set tracking"));
    }
}
