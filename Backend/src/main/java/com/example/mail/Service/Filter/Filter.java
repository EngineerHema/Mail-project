package com.example.mail.Service.Filter;

import com.example.mail.model.Email;
import java.util.List;

public interface Filter<T> {
    List<Email> applyFilter(List<Email> emails);
}
