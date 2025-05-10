package com.grahSeva.grah_seva.controller;

import com.grahSeva.grah_seva.model.Service;
import com.grahSeva.grah_seva.service.ServiceService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/services")
public class ServiceController {

    private final ServiceService serviceService;  // Changed to ServiceService

    public ServiceController(ServiceService serviceService) {
        this.serviceService = serviceService;
    }

    @GetMapping
    public List<Service> getAllServices() {
        return serviceService.getAllServices();  // Returns all services
    }
}

