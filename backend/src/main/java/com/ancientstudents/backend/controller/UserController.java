package com.ancientstudents.backend.controller;

import com.ancientstudents.backend.exception.UserNotFoundException;
import com.ancientstudents.backend.model.UserEntity;
import com.ancientstudents.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:5175/")
@RestController
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/user")
    UserEntity newUser(@RequestBody UserEntity newUser){
        if(newUser == null) return null;
        return userRepository.save(newUser);
    }

    @GetMapping("/users")
    List<UserEntity> getAllUsers(){
        return userRepository.findAll();
    }

    @GetMapping("/user/{id}")
    UserEntity getUserById(@PathVariable Long id){
        if(id == null) return null;
        return userRepository.findById(id)
                .orElseThrow(()->new UserNotFoundException(id));
    }

    @PutMapping("user/{id}")
    UserEntity updateUser(@RequestBody UserEntity newUser, @PathVariable Long id){
        if(id == null) return null;
        return userRepository.findById(id)
                .map(user -> {
                    user.setUsername(newUser.getUsername());
                    user.setEmail(newUser.getEmail());
                    return userRepository.save(user);
                }).orElseThrow(()->new UserNotFoundException(id));
    }

    @DeleteMapping("user/{id}")
    String deleteUser(@PathVariable Long id){
        if(id == null) return null;
        if(!userRepository.existsById(id)){
            throw new UserNotFoundException(id);
        }
        userRepository.deleteById(id);
        return "User with id " + id + " has been deleted successfully.";
    }
}
