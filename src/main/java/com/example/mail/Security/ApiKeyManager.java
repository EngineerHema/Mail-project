package com.example.mail.Security;

import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class ApiKeyManager {
    // Singleton instance
    private static ApiKeyManager instance;

    // 4 HashMaps to store API keys
    private Map<String, String> apiKeyMap1;
    private Map<String, String> apiKeyMap2;
    private Map<String, String> apiKeyMap3;
    private Map<String, String> apiKeyMap4;

    // Counter to track which map to use for adding new API keys
    private int mapCounter = 0;

    // Private constructor to prevent direct instantiation
    private ApiKeyManager() {
        this.apiKeyMap1 = new HashMap<>();
        this.apiKeyMap2 = new HashMap<>();
        this.apiKeyMap3 = new HashMap<>();
        this.apiKeyMap4 = new HashMap<>();
    }

    // Get the Singleton instance
    public static ApiKeyManager getInstance() {
        if (instance == null) {
            instance = new ApiKeyManager();
        }
        return instance;
    }

    // Generate a unique API key for the user, added to one of the 4 maps in a sequential manner
    public String generateApiKey(String userEmail) {
        // Create a new unique API key
        String apiKey = UUID.randomUUID().toString();

        // Select the appropriate map based on the mapCounter (round-robin)
        Map<String, String> selectedMap = getNextMap();
        selectedMap.put(userEmail, apiKey);  // Store it in the selected map

        return apiKey;
    }

    // Get the next map in the sequential cycle (first to fourth, then back to first)
    private Map<String, String> getNextMap() {
        Map<String, String> selectedMap;
        switch (mapCounter % 4) {
            case 0:
                selectedMap = apiKeyMap1;
                break;
            case 1:
                selectedMap = apiKeyMap2;
                break;
            case 2:
                selectedMap = apiKeyMap3;
                break;
            case 3:
                selectedMap = apiKeyMap4;
                mapCounter = -1;
                break;
            default:
                throw new IllegalStateException("Unexpected value: " + (mapCounter % 4));
        }
        mapCounter++;  // Increment map counter to ensure round-robin
        return selectedMap;
    }

    // Synchronously validate the API key by checking the maps directly
    public boolean validateApiKey(String emailAddress, String apiKey) {
        // Check all maps one by one for the API key
        String fetchedApiKey = apiKeyMap1.get(emailAddress);
        System.out.println("Search API key in all maps");
        System.out.println(apiKeyMap1);
        System.out.println(apiKeyMap2);
        System.out.println(apiKeyMap3);
        System.out.println(apiKeyMap4);
        if (fetchedApiKey != null && fetchedApiKey.equals(apiKey)) {
            return true;
        }

        fetchedApiKey = apiKeyMap2.get(emailAddress);
        if (fetchedApiKey != null && fetchedApiKey.equals(apiKey)) {
            return true;
        }

        fetchedApiKey = apiKeyMap3.get(emailAddress);
        if (fetchedApiKey != null && fetchedApiKey.equals(apiKey)) {
            return true;
        }

        fetchedApiKey = apiKeyMap4.get(emailAddress);
        if (fetchedApiKey != null && fetchedApiKey.equals(apiKey)) {
            return true;
        }

        return false;  // If the key is not found in any map
    }

    // Synchronously invalidate the API key by removing it from all maps
    public void invalidateApiKey(String userEmail) {
        // Remove the API key from each map
        apiKeyMap1.remove(userEmail);
        apiKeyMap2.remove(userEmail);
        apiKeyMap3.remove(userEmail);
        apiKeyMap4.remove(userEmail);

        System.out.println("Removed API key from all maps");
        System.out.println(apiKeyMap1);
        System.out.println(apiKeyMap2);
        System.out.println(apiKeyMap3);
        System.out.println(apiKeyMap4);
    }
}
