package com.gym.tracker.service;

import com.gym.tracker.dto.SetRequestDTO;
import com.gym.tracker.dto.SetResponseDTO;
import com.gym.tracker.dto.SetUpdateRequestDTO;

public interface SetService {

    SetResponseDTO addSet(SetRequestDTO requestDTO);

    SetResponseDTO updateSet(Long id, SetUpdateRequestDTO requestDTO);

    void deleteSet(Long id);
}
