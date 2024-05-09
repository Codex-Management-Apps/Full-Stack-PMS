package com.ancientstudents.backend.security.auth;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationService service;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
        @RequestBody RegisterRequest request
    ) {
        System.out.println(request);
        return ResponseEntity.ok(service.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> authenticate(
        @RequestBody AuthenticationRequest request
    ) {
        return ResponseEntity.ok(service.authenticate(request));
    }

    @PostMapping("/refresh-token")
    public void refreshToken(
        HttpServletRequest request,
        HttpServletResponse response
    ) throws IOException {
        service.refreshToken(request, response);
    }
    
    // @Autowired
    // private AuthenticationManager authenticationManager;

    // @Autowired
    // private UserRepository userRepository;

    // @Autowired
    // private DepartmentRepository departmentRepository;

    // @Autowired
    // private PasswordEncoder passwordEncoder;

    // @Autowired
    // private JwtService jwtGenerator;

    // @PostMapping("register")    
    // public ResponseEntity<String> register(@RequestBody RegisterRequest registerDto){
    //     if(userRepository.existsByUsername(registerDto.getUsername())){
    //         return new ResponseEntity<>("username is taken!", HttpStatus.BAD_REQUEST);
    //     }

    //     UserEntity user = new UserEntity();
    //     user.setUsername(registerDto.getUsername());
    //     user.setPassword(passwordEncoder.encode(registerDto.getPassword()));
    //     user.setEmail(registerDto.getEmail());

    //     Department department = departmentRepository.findByDepartmentName(registerDto.getDepartment()).get();
    //     user.setDepartment(Collections.singletonList(department));

    //     userRepository.save(user);

    //     return new ResponseEntity<>("User registered Success", HttpStatus.OK);
    // }
    // @PostMapping("login")
    // public ResponseEntity<AuthenticationResponse> login(@RequestBody LoginDto loginDto){
    //     Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginDto.getUsername(), loginDto.getPassword()));
        
    //     UserEntity user = userRepository.findByUsername(loginDto.getUsername()).orElseThrow(()-> new UsernameNotFoundException("Username not found"));
        
    //     SecurityContextHolder.getContext().setAuthentication(authentication);
    //     String token = jwtGenerator.generateToken(authentication);
    //     AuthenticationResponse response = new AuthenticationResponse(token);
    //     response.setDepartment(user.getDepartment());
    //     response.setUsername(user.getUsername());
    //     response.setId(user.getId());
    //     return new ResponseEntity<>(response,HttpStatus.OK);
    // }

}
