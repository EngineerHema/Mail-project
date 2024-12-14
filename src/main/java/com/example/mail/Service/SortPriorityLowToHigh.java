package com.example.mail.Service;

import com.example.mail.model.Email;
import org.springframework.stereotype.Component;

import java.util.Comparator;
import java.util.List;

@Component
public class SortPriorityLowToHigh implements Sort<Email>{
    @Override
    public List<Email> applySort(List<Email> emails) {
        emails.sort(Comparator.comparing(SortPriorityLowToHigh::getPriorityValue));
        return emails;
    }
    private static int getPriorityValue(Email email) {
        return switch (email.getPriority().toUpperCase()) {
            case "HIGH" -> 3;
            case "MEDIUM" -> 2;
            case "LOW" -> 1;
            default -> Integer.MIN_VALUE;
        };
    }
}
