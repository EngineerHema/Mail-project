package com.example.mail.Service.Sort;

import com.example.mail.model.Email;

import java.util.List;

public interface Sort<T>{
    List<Email> applySort(List<Email> emails);
}
