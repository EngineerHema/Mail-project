package com.example.mail.Service;

import com.example.mail.DAO.JPAEmails;
import com.example.mail.DAO.JPAUsers;
import com.example.mail.Service.EmailFacade.EmailFacade;
import com.example.mail.Service.EmailFacade.EmailFacadeImp;
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
import java.util.concurrent.ConcurrentHashMap;

@Service
public class EmailService {

    JPAUsers jpaUsers;
    JPAEmails jpaEmails;

    EmailFacade emailFacade;
    private Map<String, List<Email>> emailCache;

    @Autowired
    private EmailService(JPAUsers jpaUsers, JPAEmails jpaEmails, EmailFacadeImp emailFacadeImp) {
        this.jpaUsers = jpaUsers;
        this.jpaEmails = jpaEmails;
        this.emailFacade = emailFacadeImp;
        emailCache = new ConcurrentHashMap<>();


    }

    public boolean sendEmail(Email email,boolean isDraft) {
        Optional<User> receiver = jpaUsers.findByEmailAddress(email.getToAddress());
        Optional<User> sender = jpaUsers.findByEmailAddress(email.getFromAddress());

        if (isDraft){
            email.setTimeStamp(LocalDateTime.now());
            email.setType("draft");
            sender.get().addEmail(email);
            sender.get().setSentObserver(true);
            jpaUsers.save(sender.get());
            return true;
        }
        if (sender.isPresent() && receiver.isPresent()) {
            email.setTimeStamp(LocalDateTime.now());
            email.setType("sent");
            sender.get().addEmail(email);
            sender.get().setSentObserver(true);
            jpaUsers.save(sender.get());

            email.setType("inbox");
            receiver.get().addEmail(email);
            receiver.get().setInboxObserver(true);
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
            emailOwner.setDeleteObserver(true);
            if (email.isPresent()){
                if (email.get().getType().equals("trash")){
                    emailOwner.setDeleteObserver(true);
                    jpaEmails.delete(email.get());
                }
                else if (email.get().getType().equals("inbox")){
                    email.get().setType("trash");
                    emailOwner.setInboxObserver(true);
                    jpaEmails.save(email.get());
                }else if (email.get().getType().equals("sent")){
                    email.get().setType("trash");
                    emailOwner.setSentObserver(true);
                    jpaEmails.save(email.get());
                }
                else {
                    jpaEmails.delete(email.get());
                }
            }
            jpaUsers.save(emailOwner);
            return true;
        }catch (Error e){
            System.out.println("At delete: "+e);
            return false;
        }
    }


    public List<Email> returnEmails(String Address, String type, String sort,String search, String substring) {
        try {

            Optional<User> user = jpaUsers.findByEmailAddress(Address);
            List<Email> emails;

            switch (type){
                case "inbox":
                    if (user.get().isInboxObserver()){
                        emailCache.put(Address+type, user.get().getEmails());
                        user.get().setInboxObserver(false);
                    }
                    break;

                case "sent":
                    if (user.get().isSentObserver()){
                        emailCache.put(Address+type, user.get().getEmails());
                        user.get().setSentObserver(false);
                    }
                    break;

                case "trash":
                    if (user.get().isDeleteObserver()){
                        emailCache.put(Address+type, user.get().getEmails());
                        user.get().setDeleteObserver(false);
                    }
                    break;

                default:
                    break;

            }
            emails = emailCache.getOrDefault(Address+type,null);


            if (emails!=null) {
                emails = emailFacade.modifyEmail(emails, type, sort, search, substring);
                System.out.println(emails);
                System.out.println("substring is" + substring);
                System.out.println("this is the emails");
            }
            jpaUsers.save(user.get());

            return emails;
        }

        catch (Error e){
            return null;
        }
    }

    public boolean addToFolder(String id, String folderName) {
        Optional<Email> email = jpaEmails.findById(Integer.parseInt(id));
        if (email.isPresent() && !email.get().getFoldersNames().contains(folderName)){
            email.get().addFoldersName(folderName);
            jpaEmails.save(email.get());
            return true;
        }
        return false;
    }

    public List<Email> returnFolderEmails(String address, String type, String sort, String search, String substring) {
        try {

            Optional<User> user = jpaUsers.findByEmailAddress(address);
            List<Email> emails = user.get().getEmails();


            if (emails!=null) {
                emails = emailFacade.modifyEmail(emails, type, sort, search, substring);
                System.out.println(emails);
                System.out.println("substring is" + substring);
                System.out.println("this is the emails");
            }
            jpaUsers.save(user.get());

            return emails;
        }

        catch (Error e){
            return null;
        }
    }

    public boolean deleteFromFolder(String id, String type) {
        try {
            Optional<Email> email = jpaEmails.findById(Integer.parseInt(id));
            User emailOwner = email.get().getUser();

            if (email.isPresent()){
                email.get().removeFoldersName(type);
            }

            jpaUsers.save(emailOwner);
            return true;
        }catch (Error e){
            System.out.println("At deleteFolder: "+e);
            return false;
        }
    }


    public boolean restoreEmail(String address, String id) {
        Optional<Email> email = jpaEmails.findById(Integer.parseInt(id));

        if (email.isPresent()) {
            Email retrievedEmail = email.get();
            User emailOwner = retrievedEmail.getUser();
            emailOwner.setDeleteObserver(true);


            if (address.equals(retrievedEmail.getFromAddress())) {
                retrievedEmail.setType("sent");
                emailOwner.setSentObserver(true);
            }

            else if (address.equals(retrievedEmail.getToAddress())) {
                retrievedEmail.setType("inbox");
                emailOwner.setInboxObserver(true);
            }

            jpaEmails.save(retrievedEmail);
            return true;
        }

        return false;
    }

}
