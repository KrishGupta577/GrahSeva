package com.grahSeva.grah_seva.controller;

import com.grahSeva.grah_seva.model.ActiveService;
import com.grahSeva.grah_seva.service.ActiveServiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/active-services")
public class ActiveServiceController {

    @Autowired
    private ActiveServiceService service;

    @GetMapping
    public List<ActiveService> getAllServices() {
        return service.getAllServices();
    }

    @PostMapping
    public ResponseEntity<ActiveService> addService(@RequestBody ActiveService newService) {
        return new ResponseEntity<>(service.addService(newService), HttpStatus.CREATED);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<ActiveService>> getByUserId(@PathVariable Long userId) {
        List<ActiveService> services = service.getServicesByUserId(userId);
        if (services.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(services, HttpStatus.OK);
        }
    }
}
