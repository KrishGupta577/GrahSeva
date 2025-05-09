package com.grahSeva.grah_seva.service;

import com.grahSeva.grah_seva.model.ActiveService;
import com.grahSeva.grah_seva.repository.ActiveServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ActiveServiceService {

    @Autowired
    private ActiveServiceRepository repository;

    public List<ActiveService> getAllServices() {
        return repository.findAll();
    }

    public ActiveService addService(ActiveService service) {
        return repository.save(service);
    }

    public List<ActiveService> getServicesByUserId(Long userId) {
        return repository.findByUserId(userId);
    }
}
