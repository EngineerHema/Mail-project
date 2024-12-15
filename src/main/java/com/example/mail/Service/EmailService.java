package com.example.mail.Service;

import com.example.mail.DAO.JPAEmails;
import com.example.mail.DAO.JPAUsers;
import com.example.mail.model.Attachment;
import com.example.mail.model.Email;
import com.example.mail.model.User;
import org.aspectj.weaver.ast.Var;
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



    @Autowired
    private EmailService(JPAUsers jpaUsers, JPAEmails jpaEmails, FilterStrategyImp filterStrategyImp, SortStratagyImp sortStratagyImp){
        this.jpaUsers = jpaUsers;
        this.jpaEmails = jpaEmails;
        this.filterStrategy = filterStrategyImp;
        this.sortStratagy = sortStratagyImp;


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


    public List<Email> returnEmails(String Address, String type, String sort) {
        try {

            List<Email> emails = jpaUsers.findByEmailAddress(Address).get().getEmails();
            System.out.println(emails);
            Filter<Email> filter = filterStrategy.setFilteringStrategy(type);
            Sort<Email> sortingMethod = sortStratagy.setSortingStrategy(sort);
            emails = filter.applyFilter(emails);
            emails = sortingMethod.applySort(emails);
            System.out.println(emails);

            return emails;
        }

        catch (Error e){
            return null;
        }
    }

}
