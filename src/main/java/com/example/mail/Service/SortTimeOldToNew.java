package com.example.mail.Service;

import com.example.mail.model.Email;
import org.springframework.stereotype.Component;

import java.util.Comparator;
import java.util.List;

@Component
public class SortTimeOldToNew implements Sort<Email> {
    @Override
    public List<Email> applySort(List<Email> emails) {
        emails.sort(Comparator.comparing(Email::getTimeStamp));
        return emails;
    }
}

