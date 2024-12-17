package com.example.mail.Service;

import com.example.mail.DAO.JPAEmails;
import com.example.mail.DAO.JPAUsers;
import com.example.mail.Service.Filter.Filter;
import com.example.mail.Service.Filter.FilterStrategy;
import com.example.mail.Service.Filter.FilterStrategyImp;
import com.example.mail.Service.Search.SearchStratagy;
import com.example.mail.Service.Search.SearchStratagyImp;
import com.example.mail.Service.Sort.Sort;
import com.example.mail.Service.Search.Search;
import com.example.mail.Service.Sort.SortStratagy;
import com.example.mail.model.Email;
import com.example.mail.model.User;
import com.example.mail.Service.Sort.SortStratagyImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class EmailService {

    JPAUsers jpaUsers;
    JPAEmails jpaEmails;
    private FilterStrategy filterStrategy;
    private SortStratagy sortStratagy;
    private SearchStratagy searchStratagy;

    @Autowired
    private EmailService(JPAUsers jpaUsers, JPAEmails jpaEmails, FilterStrategyImp filterStrategyImp, SortStratagyImp sortStratagyImp, SearchStratagyImp searchStratagyImp) {
        this.jpaUsers = jpaUsers;
        this.jpaEmails = jpaEmails;
        this.filterStrategy = filterStrategyImp;
        this.sortStratagy = sortStratagyImp;
        this.searchStratagy = searchStratagyImp;


    }

    public boolean sendEmail(Email email) {
        Optional<User> receiver = jpaUsers.findByEmailAddress(email.getToAddress());
        Optional<User> sender = jpaUsers.findByEmailAddress(email.getFromAddress());


        if (sender.isPresent() && receiver.isPresent()) {
            email.setTimeStamp(LocalDateTime.now());
            email.setType("sent");
            sender.get().addEmail(email);
            jpaUsers.save(sender.get());

            email.setType("inbox");
            receiver.get().addEmail(email);
            jpaUsers.save(receiver.get());



            return true;
        } else {
            return false;
        }
    }
    public boolean deleteEmail(String id) {
        try {
            Optional<Email> email = jpaEmails.findById(Integer.parseInt(id));
            User emailOwner = email.get().getUser();

            if (email.isPresent()){
                if (email.get().getType().equals("trash")){
                    jpaEmails.delete(email.get());
                }else {
                    email.get().setType("trash");
                    jpaEmails.save(email.get());
                }
            }
            return true;
        }catch (Error e){
            System.out.println("At delete: "+e);
            return false;
        }
    }


    public List<Email> returnEmails(String Address, String type, String sort,String search, String substring) {
        try {

            Optional<User> user = jpaUsers.findByEmailAddress(Address);



            List<Email> emails = user.get().getEmails();
            Filter<Email> filter = filterStrategy.setFilteringStrategy(type);
            Sort<Email> sortingMethod = sortStratagy.setSortingStrategy(sort);
            Search<Email> searchingMethod = searchStratagy.setSearchingStrategy(search);
            emails = filter.applyFilter(emails);
            emails = sortingMethod.applySort(emails);
            if (!substring.equals("")&&!substring.equals(null)&&substring.length()>0){
               emails = searchingMethod.applySearch(emails, substring);
            }
            System.out.println(emails);
            System.out.println("substring is" + substring);
            System.out.println("this is the emails");
            return emails;
        }

        catch (Error e){
            return null;
        }
    }

}
