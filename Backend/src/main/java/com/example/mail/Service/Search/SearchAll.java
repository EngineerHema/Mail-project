package com.example.mail.Service.Search;

import com.example.mail.model.Email;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class SearchAll implements Search<Email> {
    @Override
    public  List<Email> applySearch(List<Email> emails , String substring){
        return emails.stream()
                .filter(email -> emailContainsSubstring(email, substring))
                .collect(Collectors.toList());
    }
    private boolean emailContainsSubstring(Email email, String substring) {
        boolean check = false ;
        for (int i = 0; i < email.getAttachments().size(); i++) {
            String name = email.getAttachments().get(i).getName().toLowerCase();
            if(name.contains(substring.toLowerCase())){
                check = true;
            }
        }
        check = check|email.getBody().toLowerCase().contains(substring.toLowerCase());
        check = check|email.getSubject().toLowerCase().contains(substring.toLowerCase());
        check = check|email.getFromAddress().toLowerCase().contains(substring.toLowerCase());
        check = check|email.getToAddress().toLowerCase().contains(substring.toLowerCase());
        return check;
    }
    }

