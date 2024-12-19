package com.example.mail.Controller;

import com.example.mail.Service.EmailService;
import com.example.mail.Security.ApiKeyManager;
import com.example.mail.Service.UserService;
import com.example.mail.model.Attachment;
import com.example.mail.model.Contact;
import com.example.mail.model.Email;
import com.example.mail.model.User;
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

    private final List<String> validTypes = Arrays.asList("inbox", "trash", "sent", "defaultType","draft");

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
        email.setSingleAddressDraft(requestBody.get("singleAddressDraft").toString());
        boolean isDraft = requestBody.get("isDraft").toString().equals("true");

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
        email.setToAddressDraft(toAddresses);
        boolean sent = false;
        if(isDraft){
            sent = emailService.sendEmail(email,isDraft);
            if (sent) {
                return ResponseEntity.ok("Email sent successfully!");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User validation failed.");
            }
        }
        else {
            if (toAddresses == null || toAddresses.isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Missing recipient address.");
            }
            // Send the email to all recipients

            for (String toAddress : toAddresses) {
                email.setToAddress(toAddress);
                sent = emailService.sendEmail(email,isDraft);
            }

            // Return response based on whether the email was sent successfully
            if (sent) {
                return ResponseEntity.ok("Email sent successfully!");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User validation failed.");
            }
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

        List<Email> emails;
        if (apiKeyManager.validateApiKey(address, apiKey)) {
            if (validTypes.contains(type)){
                emails = emailService.returnEmails(address, type, sort, search, substring);
            }else {
                emails = emailService.returnFolderEmails(address, type, sort, search, substring);
            }
            return ResponseEntity.ok(emails);
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
        }
    }


    @DeleteMapping("/deleteEmail")
    public ResponseEntity<?> deleteEmail(
            @RequestHeader("Authorization") String authorization,
            @RequestParam("Address") String address,
            @RequestParam(value = "id", required = true) List<String> ids,
            @RequestParam(value = "type", required = false) String type) {


        String apiKey = extractApiKey(authorization);
        System.out.println("Key: " + apiKey);

        if (apiKey == null || address == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Missing key or active address!");
        }

        if (apiKeyManager.validateApiKey(address, apiKey)) {
            boolean allDeleted = true;

            for (String id : ids) {
                boolean deleted = true;
                if (validTypes.contains(type)) {
                    deleted = emailService.deleteEmail(id);
                }else {
                    deleted = emailService.deleteFromFolder(id, type);
                }
                if (!deleted) {
                    allDeleted = false;
                }
            }

            if (allDeleted) {
                return ResponseEntity.ok("Emails deleted successfully!");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("One or more emails not found!");
            }
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Invalid API key!");
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

        @PostMapping("/createFolder")
        public ResponseEntity<String> createFolder(@RequestHeader("Authorization") String authorization, @RequestBody Map<String, Object> requestBody) throws ExecutionException, InterruptedException {
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

            if (userService.saveFolder(emailAddress, requestBody.get("name").toString())) {
                return ResponseEntity.status(HttpStatus.OK).body("Folder saved.");
            }

            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to save Folder.");

    }

    @PutMapping("/modifyFolder")
    public ResponseEntity<String> modifyFolder(@RequestHeader("Authorization") String authorization, @RequestBody Map<String, Object> requestBody) throws ExecutionException, InterruptedException {
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

         if (userService.modifyFolder(emailAddress, requestBody.get("oldName").toString(), requestBody.get("newName").toString())) {
            return ResponseEntity.status(HttpStatus.OK).body("Folder renamed.");
        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to save Folder.");

    }

    @DeleteMapping("deleteFolder/{name}/{emailAddress}")
    public ResponseEntity<String> deleteFolder(@RequestHeader("Authorization") String authorization, @PathVariable String name, @PathVariable String emailAddress) throws ExecutionException, InterruptedException {
        // Extract API key from the Authorization header
        String apiKey = extractApiKey(authorization);
        System.out.println("Key: " + apiKey);

        // Check if the required parameters are present
        if (apiKey == null || emailAddress == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Missing API key or email.");
        }


        if (!apiKeyManager.validateApiKey(emailAddress, apiKey)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Invalid API key.");
        }

        if (userService.deleteFolder(emailAddress, name)) {
            return ResponseEntity.status(HttpStatus.OK).body("Folder deleted.");
        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to delete Folder.");

    }

    @GetMapping("getFolders/{emailAddress}")
    public ResponseEntity<?> getFolders(@RequestHeader("Authorization") String authorization, @PathVariable String emailAddress) throws ExecutionException, InterruptedException {
        // Extract API key from the Authorization header
        String apiKey = extractApiKey(authorization);
        System.out.println("Key: " + apiKey);

        // Check if the required parameters are present
        if (apiKey == null || emailAddress == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Missing API key or email.");
        }


        if (!apiKeyManager.validateApiKey(emailAddress, apiKey)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Invalid API key.");
        }

        return ResponseEntity.status(HttpStatus.OK).body(userService.getFolders(emailAddress));

    }

    @PostMapping("/addToFolder")
    public ResponseEntity<?> addToFolder(
            @RequestHeader("Authorization") String authorization,
            @RequestParam("Address") String address,
            @RequestParam(value = "id", required = true) List<String> ids,
            @RequestParam("name") String folderName) {

        String apiKey = extractApiKey(authorization);
        System.out.println("Key: " + apiKey);

        if (apiKey == null || address == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Missing key or active address!");
        }

        if (apiKeyManager.validateApiKey(address, apiKey)) {
            boolean allAdded = true;

            for (String id : ids) {
                boolean added = emailService.addToFolder(id, folderName);
                if (!added) {
                    allAdded = false;
                }
            }

            if (allAdded) {
                return ResponseEntity.ok("Emails added successfully!");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("One or more emails not added!");
            }
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Invalid API key!");
        }
    }

    @PutMapping("/restoreEmail")
    public ResponseEntity<?> restoreEmail(
            @RequestHeader("Authorization") String authorization,
            @RequestParam("Address") String address,
            @RequestParam(value = "id", required = true) List<String> ids) {


        String apiKey = extractApiKey(authorization);
        System.out.println("Key: " + apiKey);

        if (apiKey == null || address == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Missing key or active address!");
        }

        if (apiKeyManager.validateApiKey(address, apiKey)) {
            boolean allRestored = true;
            boolean restored;

            for (String id : ids) {
                restored = emailService.restoreEmail(address, id);

                if (!restored) {
                    allRestored = false;
                }
            }

            if (allRestored) {
                return ResponseEntity.ok("Emails restored successfully!");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("One or more emails not restored!");
            }
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Invalid API key!");
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
