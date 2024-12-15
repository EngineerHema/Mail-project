package com.example.mail.Service.Search;

import com.example.mail.model.Email;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;
@Component
public class SearchAttachment implements Search<Email>{
    @Override
    public List<Email> applySearch(List<Email> emails , String substring){
        return emails.stream()
                .filter(email -> emailContainsSubstring(email, substring))
                .collect(Collectors.toList());
    }
    private boolean emailContainsSubstring(Email email, String substring) {
        return email.getAttachments() != null && email.getSubject().toLowerCase().contains(substring.toLowerCase());
    }
}
