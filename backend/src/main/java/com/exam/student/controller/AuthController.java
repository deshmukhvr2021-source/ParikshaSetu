package com.exam.student.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;

import com.exam.student.dto.LoginRequest;
import com.exam.student.model.User;
import com.exam.student.service.UserService;
import com.exam.student.security.JwtUtil;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final JwtUtil jwtUtil;

    public AuthController(AuthenticationManager authenticationManager, UserService userService, JwtUtil jwtUtil) {
        this.authenticationManager = authenticationManager;
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/login")
    public com.exam.student.dto.AuthResponse login(@RequestBody LoginRequest request) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        } catch (AuthenticationException e) {
            throw new RuntimeException("Invalid username or password");
        }

        User user = userService.getUserByEmail(request.getEmail()).orElseThrow();
        String token = jwtUtil.generateToken(request.getEmail());

        return new com.exam.student.dto.AuthResponse(token, user.getRole(), user.getName());
    }

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return userService.saveUser(user);
    }
}
