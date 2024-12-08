package com.example.mail.Security;

import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import java.util.*;
import java.util.concurrent.*;


@Component
public class ApiKeyManager {
    // Singleton instance
    private static ApiKeyManager instance;

    // 4 HashMaps to store API keys
    private Map<String, String> apiKeyMap1;
    private Map<String, String> apiKeyMap2;
    private Map<String, String> apiKeyMap3;
    private Map<String, String> apiKeyMap4;

    // Executor service for concurrent lookup
    private ExecutorService executorService;

    // Counter to track which map to use for adding new API keys
    private int mapCounter = 0;

    // Private constructor to prevent direct instantiation
    private ApiKeyManager() {
        this.apiKeyMap1 = new HashMap<>();
        this.apiKeyMap2 = new HashMap<>();
        this.apiKeyMap3 = new HashMap<>();
        this.apiKeyMap4 = new HashMap<>();
        this.executorService = Executors.newFixedThreadPool(4); // Thread pool with 4 threads for concurrent tasks
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

    // Validate the API key using multiple threads (across all maps)
    public boolean validateApiKey(String apiKey) throws InterruptedException, ExecutionException {
        // List of tasks to check the API key in each map
        List<Callable<Boolean>> tasks = Arrays.asList(
                () -> apiKeyMap1.containsValue(apiKey),
                () -> apiKeyMap2.containsValue(apiKey),
                () -> apiKeyMap3.containsValue(apiKey),
                () -> apiKeyMap4.containsValue(apiKey)
        );

        // Submit tasks for concurrent execution
        List<Future<Boolean>> results = executorService.invokeAll(tasks);

        // Wait for all tasks to complete and check the results
        for (Future<Boolean> result : results) {
            if (result.get()) {
                return true;  // If any task found the key, return true
            }
        }

        return false;  // If no task found the key, return false
    }

    public void invalidateApiKey(String userEmail) throws InterruptedException, ExecutionException {
        // List of tasks to remove the key from each map
        List<Callable<Void>> tasks = Arrays.asList(
                () -> {
                    apiKeyMap1.remove(userEmail);
                    return null;
                },
                () -> {
                    apiKeyMap2.remove(userEmail);
                    return null;
                },
                () -> {
                    apiKeyMap3.remove(userEmail);
                    return null;
                },
                () -> {
                    apiKeyMap4.remove(userEmail);
                    return null;
                }
        );

        // Submit tasks for concurrent execution
        List<Future<Void>> results = executorService.invokeAll(tasks);

        // Wait for all tasks to complete (in this case, no need to check result)
        for (Future<Void> result : results) {
            result.get();  // Ensure all tasks complete
        }

        System.out.println("Removed API key from all maps");
    }

}
