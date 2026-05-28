

package com.example.demo.controller;

import com.example.demo.entity.Room;
import com.example.demo.repository.RoomRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/rooms")
@CrossOrigin(origins = "http://localhost:5173")
public class RoomController {

    @Autowired
    private RoomRepository roomRepository;

    @GetMapping("/create")
    public Room createRoom() {

        String roomCode =
                UUID.randomUUID()
                        .toString()
                        .substring(0, 8);

        Room room = new Room(roomCode);

        return roomRepository.save(room);
    }



    @GetMapping("/{roomCode}")
public Room getRoom(
        @PathVariable String roomCode
) {

    return roomRepository
            .findByRoomCode(roomCode)
            .orElse(null);

}

}