package com.jobapplication.backend.service;

import com.jobapplication.backend.model.User;
import com.jobapplication.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public String register(User user) {

        User existingUser =
                userRepository.findByEmail(user.getEmail());

        if (existingUser != null) {
            return "Email already registered";
        }

        if (user.getRole() == null || user.getRole().isBlank()) {
            user.setRole("USER");
        }

        userRepository.register(user);

        return "Registration successful";
    }

    public User login(String email, String password) {

        User user = userRepository.findByEmail(email);

        if (user == null) {
            return null;
        }

        if (!user.getPassword().equals(password)) {
            return null;
        }

        return user;
    }
}