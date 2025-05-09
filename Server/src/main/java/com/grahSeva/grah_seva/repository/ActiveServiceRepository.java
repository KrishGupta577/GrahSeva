package com.grahSeva.grah_seva.repository;

import com.grahSeva.grah_seva.model.ActiveService;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ActiveServiceRepository extends JpaRepository<ActiveService, Long> {
    List<ActiveService> findByUserId(Long userId);
}
