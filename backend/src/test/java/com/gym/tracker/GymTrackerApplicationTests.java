package com.gym.tracker;

import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.junit.jupiter.api.Test;

/**
 * Basic smoke test for verifying the application entry point is available to the test runtime.
 */
class GymTrackerApplicationTests {

    @Test
    void applicationClassExists() {
        assertNotNull(GymTrackerApplication.class);
    }
}
