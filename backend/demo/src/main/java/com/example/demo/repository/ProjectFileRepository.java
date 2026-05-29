package com.example.demo.repository;
import java.util.Optional;
import com.example.demo.entity.ProjectFile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProjectFileRepository
        extends JpaRepository<ProjectFile, Long> {

    List<ProjectFile> findByRoomId(Long roomId);

    Optional<ProjectFile> findByRoomIdAndFileName(
            Long roomId,
            String fileName
    );
}