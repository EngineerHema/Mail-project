package com.example.mail.Service.Search;

import com.example.mail.model.Email;

import java.util.List;

public interface Search<T>{
    List<Email> applySearch(List<Email> emails , String substring);
}
