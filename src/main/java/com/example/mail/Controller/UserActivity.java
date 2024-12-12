package com.example.mail.Controller;

import com.example.mail.Service.EmailService;
import com.example.mail.Security.ApiKeyManager;
import com.example.mail.model.Email;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
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
    public ResponseEntity<String> sendEmail(@RequestHeader("Authorization") String authorization, @RequestBody Map<String,Object> requestBody) throws ExecutionException, InterruptedException {
        String apiKey = extractApiKey(authorization);
        System.out.println("Key: " + apiKey);
        Email email = new Email();
        List<String> toAddresses = (List<String>) requestBody.get("toAddress");
        boolean sent = false;


        if (apiKey == null || requestBody.get("fromAddress").toString() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Missing API key or sender email.");
        }
        if (!apiKeyManager.validateApiKey(requestBody.get("fromAddress").toString(), apiKey)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Invalid API key.");
        }

        email.setFromAddress(requestBody.get("fromAddress").toString());
        email.setAttachments((List<byte[]>) requestBody.get("attachments"));
        email.setBody(requestBody.get("body").toString());
        email.setPriority(requestBody.get("priority").toString());
        email.setSubject(requestBody.get("subject").toString());



        for (String toAddress : toAddresses) {
            email.setToAddress(toAddress);

            if (apiKeyManager.validateApiKey(email.getFromAddress(), apiKey)) {
                sent = emailService.sendEmail(email);

            }
        }
            if (sent) {
                return ResponseEntity.ok("Email sent successfully!");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User validation failed.");
            }
    }

    @GetMapping("/getEmail")
    public ResponseEntity<List<Email>> getEmails(
            @RequestHeader("Authorization") String authorization,
            @RequestParam("Address") String address,
            @RequestParam(value = "type", required = false) String type) throws ExecutionException, InterruptedException {

        String apiKey = extractApiKey(authorization);
        System.out.println("Key: " + apiKey);

        if (apiKey == null || address == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }

        if (apiKeyManager.validateApiKey(address, apiKey)) {
            List<Email> emails = emailService.returnEmails(address, type);
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
