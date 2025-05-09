package com.grahSeva.grah_seva.service;

import com.grahSeva.grah_seva.model.UserInfo;
import java.util.List;

public interface UserService {
    String registerUser(UserInfo userInfo) throws Exception;
    List<UserInfo> getAllUsers();  // This method should be in the interface
    UserInfo loginUser(UserInfo userInfo) throws Exception;
    UserInfo getUserById(Integer id) throws Exception;
}
