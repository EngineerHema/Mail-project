package com.example.mail.Controller;

import com.example.mail.Service.EmailService;
import com.example.mail.Security.ApiKeyManager;
import com.example.mail.model.Attachment;
import com.example.mail.model.Email;
import com.fasterxml.jackson.databind.JsonNode;
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

    @PostMapping("/sendEmail")
    public ResponseEntity<String> sendEmail(@RequestHeader("Authorization") String authorization, @RequestBody Map<String, Object> requestBody) throws ExecutionException, InterruptedException {
        // Extract API key from the Authorization header
        String apiKey = extractApiKey(authorization);
        System.out.println("Key: " + apiKey);

        // Check if the required parameters are present
        if (apiKey == null || requestBody.get("fromAddress") == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Missing API key or sender email.");
        }

        // Validate the API key
        String fromAddress = requestBody.get("fromAddress").toString();
        if (!apiKeyManager.validateApiKey(fromAddress, apiKey)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Invalid API key.");
        }

        // Create a new Email object and set its properties
        Email email = new Email();
        email.setFromAddress(fromAddress);
        email.setBody(requestBody.get("body").toString());
        email.setPriority(requestBody.get("priority").toString());
        email.setSubject(requestBody.get("subject").toString());

        // Set the attachments after processing them
        List<Map<String, Object>> attachmentData = (List<Map<String, Object>>) requestBody.get("attachments");
        List<Attachment> attachments = new ArrayList<>();
        if (attachmentData != null) {
            for (Map<String, Object> attachmentMap : attachmentData) {
                Attachment attachment = new Attachment();
                attachment.setContent((String) attachmentMap.get("content"));
                attachment.setName((String) attachmentMap.get("name"));
                attachment.setType((String) attachmentMap.get("type"));
                attachment.setSize(Long.parseLong(attachmentMap.get("size").toString()));
                attachments.add(attachment);
                email.addAttachment(attachment);
            }
        }
        email.setAttachments(attachments);

        // Ensure "toAddress" exists and is a list
        List<String> toAddresses = (List<String>) requestBody.get("toAddress");
        if (toAddresses == null || toAddresses.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Missing recipient address.");
        }

        // Send the email to all recipients
        boolean sent = false;
        for (String toAddress : toAddresses) {
            email.setToAddress(toAddress);
            sent = emailService.sendEmail(email);
        }

        // Return response based on whether the email was sent successfully
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
            @RequestParam(value = "type", required = false) String type,
            @RequestParam(value = "sort", required = false) String sort) throws ExecutionException, InterruptedException {

        String apiKey = extractApiKey(authorization);
        System.out.println("Key: " + apiKey);

        if (apiKey == null || address == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }

        if (apiKeyManager.validateApiKey(address, apiKey)) {
            List<Email> emails = emailService.returnEmails(address, type, sort);
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
