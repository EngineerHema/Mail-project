package com.example.mail.Controller;

import com.example.mail.Service.EmailService;
import com.example.mail.Security.ApiKeyManager;
import com.example.mail.Service.UserService;
import com.example.mail.model.Attachment;
import com.example.mail.model.Contact;
import com.example.mail.model.Email;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.concurrent.ExecutionException;

@RestController
public class UserActivity {

    @Autowired
    private ApiKeyManager apiKeyManager;

    @Autowired
    private EmailService emailService;

    @Autowired
    private UserService userService;

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
            @RequestParam(value = "sort", required = false) String sort,
            @RequestParam(value = "search", required = false) String search,
            @RequestParam(value = "substring", required = false) String substring)
            throws ExecutionException, InterruptedException {

        String apiKey = extractApiKey(authorization);
        System.out.println("Key: " + apiKey);

        if (apiKey == null || address == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }

        if (apiKeyManager.validateApiKey(address, apiKey)) {
            List<Email> emails = emailService.returnEmails(address, type, sort, search, substring);
            return ResponseEntity.ok(emails);
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
        }
    }


    @DeleteMapping("/deleteEmail")
    public ResponseEntity<?> deleteEmail(
            @RequestHeader("Authorization") String authorization,
            @RequestParam("Address") String address,
            @RequestParam(value = "id", required = true) String id) throws ExecutionException, InterruptedException {

        String apiKey = extractApiKey(authorization);
        System.out.println("Key: " + apiKey);

        if (apiKey == null || address == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Missing key or active address!");
        }

        if (apiKeyManager.validateApiKey(address, apiKey)) {
            if (emailService.deleteEmail(id)) return ResponseEntity.ok("Email is deleted!");
            else return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email not found!");

        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
        }
    }

    @PostMapping("/contacts")
    public ResponseEntity<String> saveContact(@RequestHeader("Authorization") String authorization, @RequestBody Map<String, Object> requestBody) throws ExecutionException, InterruptedException {
        // Extract API key from the Authorization header
        String apiKey = extractApiKey(authorization);
        System.out.println("Key: " + apiKey);

        // Check if the required parameters are present
        if (apiKey == null || requestBody.get("emailAddress") == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Missing API key or email.");
        }

        // Validate the API key
        String emailAddress = requestBody.get("emailAddress").toString();
        if (!apiKeyManager.validateApiKey(emailAddress, apiKey)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Invalid API key.");
        }

        Contact contact = new Contact();
        contact.setName(requestBody.get("name").toString());
        contact.setEmails((List<String>) requestBody.get("emails"));

        if (userService.saveContact(emailAddress, contact)) {
            return ResponseEntity.status(HttpStatus.OK).body("Contact saved.");
        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to save contact.");


    }

    @PutMapping("/contacts/{id}")
    public ResponseEntity<String> deleteContact(
            @RequestHeader("Authorization") String authorization,
            @PathVariable String id,
            @RequestBody Map<String, Object> requestBody) {

        // Extract API key from the Authorization header
        String apiKey = extractApiKey(authorization);
        System.out.println("Key: " + apiKey);

        // Check if the required parameters are present
        if (apiKey == null || requestBody.get("emailAddress") == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Missing API key or email.");
        }

        // Validate the API key
        String emailAddress = requestBody.get("emailAddress").toString();
        if (!apiKeyManager.validateApiKey(emailAddress, apiKey)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Invalid API key.");
        }

        Contact contact = new Contact();
        contact.setName(requestBody.get("name").toString());
        contact.setEmails((List<String>) requestBody.get("emails"));

        if (userService.modifyContact(emailAddress, contact, Integer.parseInt(id) )) {
            return ResponseEntity.status(HttpStatus.OK).body("Contact modified.");
        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to modify contact.");
    }


    @DeleteMapping("/contacts/{id}/{emailAddress}")
    public ResponseEntity<String> deleteContact(
            @RequestHeader("Authorization") String authorization,
            @PathVariable String id,
            @PathVariable String emailAddress) {

        // Extract API key from the Authorization header
        String apiKey = extractApiKey(authorization);
        System.out.println("Key: " + apiKey);

        // Check if the required parameters are present
        if (apiKey == null || emailAddress == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Missing API key or email.");
        }

        // Validate the API key
        if (!apiKeyManager.validateApiKey(emailAddress, apiKey)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Invalid API key.");
        }


        if (userService.deleteContact(emailAddress, Integer.parseInt(id))) {
            return ResponseEntity.status(HttpStatus.OK).body("Contact Deleted.");
        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to deltet contact.");


    }

    @GetMapping("contacts/{emailAddress}")
    public ResponseEntity<?> getContacts(
            @RequestHeader("Authorization") String authorization,
            @PathVariable String emailAddress) {

        String apiKey = extractApiKey(authorization);
        System.out.println("Key: " + apiKey);

        // Check if the required parameters are present
        if (apiKey == null || emailAddress == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Missing API key or email.");
        }

        // Validate the API key
        if (!apiKeyManager.validateApiKey(emailAddress, apiKey)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Invalid API key.");
        }
        return ResponseEntity.status(HttpStatus.OK).body(userService.getContacts(emailAddress));

    }

    // Extract API Key from Authorization Header
    private String extractApiKey(String authorization) {
        if (authorization != null && authorization.startsWith("Bearer ")) {
            return authorization.substring(7);  // Remove "Bearer " prefix
        }
        return null;
    }
}
