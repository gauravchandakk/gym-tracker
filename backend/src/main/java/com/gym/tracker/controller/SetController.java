package com.gym.tracker.controller;

import com.gym.tracker.dto.SetRequestDTO;
import com.gym.tracker.dto.SetResponseDTO;
import com.gym.tracker.dto.SetUpdateRequestDTO;
import com.gym.tracker.service.SetService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/sets")
@CrossOrigin(origins = {"http://localhost:5174", "http://localhost:5173"})
@RequiredArgsConstructor
@Tag(name = "Set API", description = "APIs for workout exercise sets")
public class SetController {

    private final SetService setService;

    @Operation(summary = "Add set to workout exercise")
    @PostMapping
    public ResponseEntity<SetResponseDTO> addSet(@Valid @RequestBody SetRequestDTO requestDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(setService.addSet(requestDTO));
    }

    @Operation(summary = "Update set")
    @PutMapping("/{id}")
    public ResponseEntity<SetResponseDTO> updateSet(
            @PathVariable Long id,
            @Valid @RequestBody SetUpdateRequestDTO requestDTO
    ) {
        return ResponseEntity.ok(setService.updateSet(id, requestDTO));
    }

    @Operation(summary = "Delete set")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSet(@PathVariable Long id) {
        setService.deleteSet(id);
        return ResponseEntity.noContent().build();
    }
}
