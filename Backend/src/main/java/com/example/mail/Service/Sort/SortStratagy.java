package com.example.mail.Service.Sort;

import com.example.mail.model.Email;

public interface SortStratagy {
 Sort<Email> setSortingStrategy(String type);
}
