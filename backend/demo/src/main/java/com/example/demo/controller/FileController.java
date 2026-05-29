package com.example.demo.controller;
import java.util.Optional;

import com.example.demo.entity.ProjectFile;
import com.example.demo.repository.ProjectFileRepository;
import com.example.demo.entity.Room;
import com.example.demo.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/files")
@CrossOrigin(origins = "http://localhost:5173")
public class FileController {

    @Autowired
    private ProjectFileRepository projectFileRepository;

    @Autowired
private RoomRepository roomRepository;

    @GetMapping
    public List<ProjectFile> getAllFiles() {

        return projectFileRepository.findAll();

    }


   @PostMapping("/save/{roomCode}")
public ProjectFile saveFile(
        @PathVariable String roomCode,
        @RequestBody ProjectFile projectFile
) {

    Room room =
            roomRepository
                    .findByRoomCode(roomCode)
                    .orElseThrow();

    projectFile.setRoomId(room.getId());

    
Optional<ProjectFile> existingFile =
        projectFileRepository
                .findByRoomIdAndFileName(
                        room.getId(),
                        projectFile.getFileName()
                );

if (existingFile.isPresent()) {

    ProjectFile file =
            existingFile.get();

    file.setContent(
            projectFile.getContent()
    );

    file.setLanguage(
            projectFile.getLanguage()
    );

    return projectFileRepository.save(
            file
    );
}

projectFile.setRoomId(
        room.getId()
);

return projectFileRepository.save(
        projectFile
);
}



@GetMapping("/{roomCode}")
public List<ProjectFile> getFiles(
        @PathVariable String roomCode
) {

    Room room =
            roomRepository
                    .findByRoomCode(roomCode)
                    .orElseThrow();

    return projectFileRepository
            .findByRoomId(
                    room.getId()
            );
}






}

