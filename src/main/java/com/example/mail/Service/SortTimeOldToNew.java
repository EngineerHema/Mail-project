package com.example.mail.Service;

import com.example.mail.model.Email;

import java.util.Comparator;
import java.util.List;

public class SortTimeOldToNew implements Sort<Email> {
    @Override
    public List<Email> applySort(List<Email> emails) {
        emails.sort(Comparator.comparing(Email::getTimeStamp));
        return emails;
    }
}

