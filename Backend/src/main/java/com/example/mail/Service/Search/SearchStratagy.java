package com.example.mail.Service.Search;

import com.example.mail.model.Email;

public interface SearchStratagy {
    Search<Email> setSearchingStrategy(String type);
}
