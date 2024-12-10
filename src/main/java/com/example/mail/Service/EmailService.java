package com.example.mail.Service;

import com.example.mail.DAO.JPAEmails;
import com.example.mail.DAO.JPAUsers;
import com.example.mail.model.Email;
import com.example.mail.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class EmailService {

    JPAUsers jpaUsers;
    JPAEmails jpaEmails;
    private FilterStrategy filterStrategy;


    @Autowired
    private EmailService(JPAUsers jpaUsers, JPAEmails jpaEmails, FilterStrategyImp filterStrategyImp){
        this.jpaUsers = jpaUsers;
        this.jpaEmails = jpaEmails;
        this.filterStrategy = filterStrategyImp;

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



            }else {
                return false;
            }
    }

    public List<Email> returnEmails(String Address, String type) {
        try {

            List<Email> emails = jpaUsers.findByEmailAddress(Address).get().getEmails();
            System.out.println(emails);
            Filter<Email> filter = filterStrategy.setFilteringStrategy(type);
            emails = filter.applyFilter(emails);
            System.out.println(emails);

            return emails;
        }

        catch (Error e){
            return null;
        }
    }

}
