package com.ancientstudents.backend.config;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;

import com.ancientstudents.backend.model.Department;
import com.ancientstudents.backend.model.UserEntity;
import com.ancientstudents.backend.repository.UserRepository;

@Service
public class CustomerUserDetailsService implements UserDetailsService{

    @Autowired
    private UserRepository userRepository;



    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserEntity user = userRepository.findByUsername(username).orElseThrow(()-> new UsernameNotFoundException("Username not found"));
        return new User(user.getUsername(),user.getPassword(),mapDepartments(user.getDepartment()));
    }
    
    private Collection<GrantedAuthority> mapDepartments(List<Department> departments){
        return departments.stream().map(department -> new SimpleGrantedAuthority(department.getDepartmentName())).collect(Collectors.toList());
    }
}
