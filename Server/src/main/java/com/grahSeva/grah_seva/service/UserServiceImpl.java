package com.grahSeva.grah_seva.service;


import com.grahSeva.grah_seva.model.UserInfo;
import com.grahSeva.grah_seva.repository.UserInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserInfoRepository userInfoRepository;

    @Override
    public String registerUser(UserInfo userInfo) throws Exception {
        Optional<UserInfo> existingUser = userInfoRepository.findByEmail(userInfo.getEmail());
        if (existingUser.isPresent()) {
            throw new Exception("User already exists");
        }

        // Store the password as is (not recommended for production)
        userInfoRepository.save(userInfo);
        return "User registered successfully";
    }

    @Override
    public List<UserInfo> getAllUsers() {
        return userInfoRepository.findAll();
    }

    @Override
    public UserInfo loginUser(UserInfo userInfo) throws Exception {
        Optional<UserInfo> existingUser = userInfoRepository.findByEmail(userInfo.getEmail());
        if (!existingUser.isPresent()) {
            throw new Exception("User not found");
        }

        UserInfo user = existingUser.get();
        // Secure password comparison (you can improve this by using password hashing)
        if (!userInfo.getPassword().equals(user.getPassword())) {
            throw new Exception("Incorrect password");
        }

        // Nullify the password before sending the user data back
        user.setPassword(null);  // Don't send password back to the frontend
        return user;  // Return the full UserInfo object
    }

    @Override
    public UserInfo getUserById(Integer id) {
        return userInfoRepository.findById(id).orElse(null);
    }

}
