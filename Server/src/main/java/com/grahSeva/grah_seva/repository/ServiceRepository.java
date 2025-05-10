package com.grahSeva.grah_seva.repository;

import com.grahSeva.grah_seva.model.Service;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ServiceRepository extends JpaRepository<Service, Long> {
    List<Service> findAll();
}
