package com.jobapplication.backend.controller;

import com.jobapplication.backend.model.User;
import com.jobapplication.backend.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(
            @RequestBody User user) {

        String result = authService.register(user);

        if (result.equals("Email already registered")) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", result));
        }

        return ResponseEntity.ok(
                Map.of("message", result)
        );
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody Map<String, String> loginData) {

        String email = loginData.get("email");
        String password = loginData.get("password");

        User user = authService.login(
                email,
                password
        );

        if (user == null) {
            return ResponseEntity.status(401)
                    .body(Map.of(
                            "message",
                            "Invalid email or password"
                    ));
        }

        user.setPassword(null);

        return ResponseEntity.ok(user);
    }
}