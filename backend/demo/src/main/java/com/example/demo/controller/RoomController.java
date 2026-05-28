package com.example.demo.controller;

import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/rooms")
@CrossOrigin(origins = "*")
public class RoomController {

    @PostMapping("/create")
    public Map<String, String> createRoom() {

        String roomId = UUID.randomUUID()
                .toString()
                .substring(0, 8);

        Map<String, String> response = new HashMap<>();

        response.put("roomId", roomId);

        return response;
    }
}