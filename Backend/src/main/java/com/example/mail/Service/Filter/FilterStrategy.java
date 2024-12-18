package com.example.mail.Service.Filter;

import com.example.mail.model.Email;

public interface FilterStrategy {
    Filter<Email> setFilteringStrategy(String type);  // Returns the filtering strategy (inbox, sent, etc.)
}
