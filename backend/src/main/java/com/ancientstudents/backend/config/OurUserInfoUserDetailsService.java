package com.ancientstudents.backend.config;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.ancientstudents.backend.model.User;
import com.ancientstudents.backend.repository.UserRepository;

public class OurUserInfoUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> user = userRepository.findByEmail(username);
        return user.map(OurUserInfoDetails::new).orElseThrow(()-> new UsernameNotFoundException("User Does not Exists"));
    }
    
}
