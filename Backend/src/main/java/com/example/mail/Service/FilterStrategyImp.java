package com.example.mail.Service;

import com.example.mail.model.Email;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FilterStrategyImp implements FilterStrategy {

    private InboxFilter inboxFilter;
    private SentFilter sentFilter;
    private TrashFilter trashFilter;
    private StarFilter starFilter;


    @Autowired
    public FilterStrategyImp(InboxFilter inboxFilter, SentFilter sentFilter, TrashFilter trashFilter, StarFilter starFilter) {
        this.inboxFilter = inboxFilter;
        this.sentFilter = sentFilter;
        this.trashFilter = trashFilter;
        this.starFilter = starFilter;
    }

    @Override
    public Filter<Email> setFilteringStrategy(String type) {
        switch (type.toLowerCase()) {
            case "sent":
                return sentFilter;
            case "trash":
                return trashFilter;
            case "star":
                return starFilter;
            default:
                return inboxFilter;
        }
    }

}
