package com.example.mail.Service.Filter;

import com.example.mail.model.Email;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FilterStrategyImp implements FilterStrategy {

    private InboxFilter inboxFilter;
    private SentFilter sentFilter;
    private TrashFilter trashFilter;
    private StarFilter starFilter;
    private FolderFilter folderFilter;



    @Autowired
    public FilterStrategyImp(InboxFilter inboxFilter, SentFilter sentFilter, TrashFilter trashFilter, StarFilter starFilter, FolderFilter folderFilter) {
        this.inboxFilter = inboxFilter;
        this.sentFilter = sentFilter;
        this.trashFilter = trashFilter;
        this.starFilter = starFilter;
        this.folderFilter = folderFilter;
    }

    @Override
    public Filter<Email> setFilteringStrategy(String type) {

        switch (type.toLowerCase()) {
            case "inbox":
                return inboxFilter;
            case "sent":
                return sentFilter;
            case "trash":
                return trashFilter;
            case "star":
                return starFilter;
            default:
                return folderFilter;
        }
    }

}
