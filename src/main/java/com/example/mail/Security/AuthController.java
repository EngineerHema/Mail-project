package com.example.mail.Security;

import com.example.mail.DAO.JPAUsers;
import com.example.mail.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
public class AuthController {

    @Autowired
    private ApiKeyManager apiKeyManager;  // Removed static, injected via Spring

    private BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

    @Autowired
    private JPAUsers jpaUsers;

    @PostMapping("/signIn")
    public ResponseEntity<Map<String, String>> login(@RequestBody User user) {
        try {
            apiKeyManager.invalidateApiKey(user.getEmailAddress());
        }catch (Exception e){
            System.out.println("Not removed!");
        }
        Optional<User> newUser = jpaUsers.findByEmailAddress(user.getEmailAddress());
        System.out.println(user.getEmailAddress());

        if (newUser.isPresent() && bCryptPasswordEncoder.matches(user.getPassword(), newUser.get().getPassword())) {
            String apiKey = apiKeyManager.generateApiKey(user.getEmailAddress());

            // Create response map
            Map<String, String> response = new HashMap<>();
            response.put("message", "Login successful");
            response.put("apiKey", apiKey);

            return ResponseEntity.ok(response);  // Return the map as a JSON response
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Invalid credentials"));
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user) {
        System.out.println(user);

        if (jpaUsers.findByEmailAddress(user.getEmailAddress()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("User already exists");
        }

        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));

        jpaUsers.save(user);
        return ResponseEntity.status(HttpStatus.CREATED).body("Registration successful");
    }
}
