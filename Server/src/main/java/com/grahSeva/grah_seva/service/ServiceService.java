package com.grahSeva.grah_seva.service;

import com.grahSeva.grah_seva.repository.ServiceRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServiceService {

    private final ServiceRepository serviceRepository;

    public ServiceService(ServiceRepository serviceRepository) {
        this.serviceRepository = serviceRepository;
    }

    public List<com.grahSeva.grah_seva.model.Service> getAllServices() {
        return serviceRepository.findAll();
    }
}

