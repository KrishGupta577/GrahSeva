package com.grahSeva.grah_seva.controller;

import com.grahSeva.grah_seva.model.UserInfo;
import com.grahSeva.grah_seva.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody UserInfo userInfo) {
        try {
            String response = userService.registerUser(userInfo);
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Registration failed: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<UserInfo>> getAllUsers() {
        try {
            List<UserInfo> users = userService.getAllUsers();
            return new ResponseEntity<>(users, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Add login endpoint
    @PostMapping("/login")
    public ResponseEntity<UserInfo> login(@RequestBody UserInfo loginRequest) {
        try {
            System.out.println("Login request: " + loginRequest);

            // Fetching the full user data from the service
            UserInfo user = userService.loginUser(loginRequest);

            if (user == null) {
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED); // No user found
            }

            return new ResponseEntity<>(user, HttpStatus.OK); // Send full user data, excluding password
        } catch (Exception e) {
            System.out.println("Login failed: " + e.getMessage());
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED); // Handle login failure
        }
    }
    @PostMapping("/findById")
    public ResponseEntity<UserInfo> findUserById(@RequestBody Map<String, Integer> request) {
        // Check if the request contains the id key
        if (request == null || !request.containsKey("id") || request.get("id") == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        Integer userId = request.get("id");

        try {
            UserInfo user = userService.getUserById(userId);
            if (user != null) {
                user.setPassword(null); // Optional: hide password
                return new ResponseEntity<>(user, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            // Log the exception
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}


