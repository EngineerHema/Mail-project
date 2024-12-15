package com.example.mail.Service.Search;

import com.example.mail.model.Email;
import org.springframework.stereotype.Component;

import java.util.List;
@Component
public class SearchAll implements Search<Email> {
    @Override
    public  List<Email> applySearch(List<Email> emails , String substring){
        return null;
    }
}
