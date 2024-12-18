package com.example.mail.Security;

import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import java.util.Iterator;
import java.util.Map;

@Component
public class ApiKeyMapIterator implements Iterator<Map<String, String>> {

    private final Map<String, String> apiKeyMap1;
    private final Map<String, String> apiKeyMap2;
    private final Map<String, String> apiKeyMap3;
    private final Map<String, String> apiKeyMap4;
    private int currentMapIndex = 0;

    public ApiKeyMapIterator(Map<String, String> map1, Map<String, String> map2, Map<String, String> map3, Map<String, String> map4) {
        this.apiKeyMap1 = map1;
        this.apiKeyMap2 = map2;
        this.apiKeyMap3 = map3;
        this.apiKeyMap4 = map4;
    }

    @Override
    public boolean hasNext() {
        return true;
    }

    @Override
    public Map<String, String> next() {
        Map<String, String> currentMap;

        switch (currentMapIndex % 4) {
            case 0:
                currentMap = apiKeyMap1;
                break;
            case 1:
                currentMap = apiKeyMap2;
                break;
            case 2:
                currentMap = apiKeyMap3;
                break;
            case 3:
                currentMap = apiKeyMap4;
                currentMapIndex = -1;
                break;
            default:
                throw new IllegalStateException("Unexpected value: " + (currentMapIndex % 4));
        }

        currentMapIndex++; // Move to the next map in a cyclic fashion
        return currentMap;
    }
}
