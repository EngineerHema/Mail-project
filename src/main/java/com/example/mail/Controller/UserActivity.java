package com.example.mail.Controller;

import com.example.mail.Service.EmailService;
import com.example.mail.Security.ApiKeyManager;
import com.example.mail.model.Email;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ExecutionException;

@RestController
public class UserActivity {

    @Autowired
    private ApiKeyManager apiKeyManager;

    @Autowired
    private EmailService emailService;

    // Send Email Endpoint
    @PostMapping("/sendEmail")
    public ResponseEntity<String> sendEmail(@RequestHeader("Authorization") String authorization, @RequestBody Email email) throws ExecutionException, InterruptedException {
        String apiKey = extractApiKey(authorization);
        System.out.println("Key: " + apiKey);

        if (apiKey == null || email.getFromAddress() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Missing API key or sender email.");
        }

        if (apiKeyManager.validateApiKey(email.getFromAddress(), apiKey)) {
            boolean sent = emailService.sendEmail(email);
            if (sent) {
                return ResponseEntity.ok("Email sent successfully!");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User validation failed.");
            }
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Invalid API key.");
        }
    }

    // Retrieve Emails Endpoint
    @GetMapping("/getEmail")
    public ResponseEntity<List<Email>> getEmails(@RequestHeader("Authorization") String authorization, @RequestBody Map<String, String> requestBody) throws ExecutionException, InterruptedException {
        String Address = requestBody.get("Address");
        String type = requestBody.get("type");

        String apiKey = extractApiKey(authorization);
        System.out.println("Key: " + apiKey);

        if (apiKey == null || Address == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }

        if (apiKeyManager.validateApiKey(Address, apiKey)) {
            List<Email> emails = emailService.returnEmails(Address, type);
            return ResponseEntity.ok(emails);
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
        }
    }

    // Extract API Key from Authorization Header
    private String extractApiKey(String authorization) {
        if (authorization != null && authorization.startsWith("Bearer ")) {
            return authorization.substring(7);  // Remove "Bearer " prefix
        }
        return null;
    }
}
