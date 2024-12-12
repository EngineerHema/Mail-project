package com.example.mail.Service;

import com.example.mail.model.Email;

import java.util.Comparator;
import java.util.List;

public class SortPriorityHighToLow implements Sort<Email>{
    @Override
    public List<Email> applySort(List<Email> emails) {
        emails.sort(Comparator.comparing(SortPriorityHighToLow::getPriorityValue));
        return emails;
    }
    private static int getPriorityValue(Email email) {
        return switch (email.getPriority().toUpperCase()) {
            case "HIGH" -> 1;
            case "MID" -> 2;
            case "LOW" -> 3;
            default -> Integer.MAX_VALUE;
        };
    }
}
