package com.example.mail.Security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class ApiKeyManager {


    private ApiKeyMapIterator iterator;

    // Constructor with @Autowired, letting Spring manage dependencies
    @Autowired
    public ApiKeyManager(ApiKeyMapIterator apiKeyMapIterator) {
        this.iterator = apiKeyMapIterator;
    }

    // Generate a unique API key for the user, added to one of the 4 maps in a sequential manner
    public String generateApiKey(String userEmail) {
        // Create a new unique API key
        String apiKey = UUID.randomUUID().toString();

        // Put the key in the next map in the sequence using the iterator
        iterator.next().put(userEmail, apiKey);

        return apiKey;
    }

    // Validate the API key by checking all maps cyclically
    public boolean validateApiKey(String emailAddress, String apiKey) {
        // Check each map for the key in a cyclic manner
        for (int i = 0; i < 4; i++) {
            Map<String, String> currentMap = iterator.next();
            String fetchedApiKey = currentMap.get(emailAddress);
            if (fetchedApiKey != null && fetchedApiKey.equals(apiKey)) {
                return true;
            }
        }
        return false; // If the key is not found in any map
    }

    // Invalidate the API key by removing it from all maps
    public void invalidateApiKey(String userEmail) {
        // Remove the key from all maps
        for (int i = 0; i < 4; i++) {
            Map<String, String> currentMap = iterator.next();
            currentMap.remove(userEmail);
        }
    }
}
