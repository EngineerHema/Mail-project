package com.example.mail.Service.Search;

import com.example.mail.Service.Sort.Sort;
import com.example.mail.model.Email;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SearchStratagyImp implements SearchStratagy {
    private SearchAll searchAll;
    private SearchAttachment searchAttachment;
    private SearchBody searchBody;
    private SearchHead searchHead;
    private SearchReceiver searchReceiver;
    private SearchSender searchSender;


    @Autowired
    public SearchStratagyImp(SearchAll searchAll,SearchAttachment searchAttachment,SearchBody searchBody,SearchHead searchHead,SearchReceiver searchReceiver,SearchSender searchSender) {
        this.searchAll = searchAll;
        this.searchAttachment = searchAttachment;
        this.searchBody = searchBody;
        this.searchHead = searchHead;
        this.searchReceiver = searchReceiver;
        this.searchSender = searchSender;
    }
   @Override
    public  Search<Email> setSearchingStrategy(String type){
        switch (type.toLowerCase()) {
            case "attachment":
                return searchAttachment;
            case "body":
                return searchBody;
            case "head":
                return searchHead;
            case "receiver":
                    return searchReceiver;
            case "sender":
                        return searchSender;
            case "searchall":
                return searchAll;
            default:
                return searchAll ;
        }
  }
}
