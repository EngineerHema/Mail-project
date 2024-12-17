package com.example.mail.Service;

import com.example.mail.DAO.JPAUsers;
import com.example.mail.model.Contact;
import com.example.mail.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;


@Service
public class UserService {

    JPAUsers jpaUsers;

    @Autowired
    public UserService(JPAUsers jpaUsers) {
        this.jpaUsers = jpaUsers;
    }

    public boolean saveContact(String userAddress, Contact contact){
        try {
            Optional<User> user = jpaUsers.findByEmailAddress(userAddress);
            user.get().addContact(contact);
            jpaUsers.save(user.get());
            System.out.println("save: "+contact);
        }catch (Error e){
            System.out.println(e);
            return false;
        }
        return true;
    }

    public boolean deleteContact(String userAddress, int id){
        try {
            Optional<User> user = jpaUsers.findByEmailAddress(userAddress);
            user.get().deleteContact(id);
            jpaUsers.save(user.get());
            System.out.println("Deleted contact : "+id);
        }catch (Error e){
            System.out.println(e);
            return false;
        }
        return true;
    }

    public boolean modifyContact(String emailAddress, Contact contact, int id) {
        try {
            Optional<User> user = jpaUsers.findByEmailAddress(emailAddress);
            user.get().modifyContact(contact, id);
            jpaUsers.save(user.get());
            System.out.println("Modified: "+contact);
        }catch (Error e){
            System.out.println(e);
            return false;
        }
        return true;
    }

    public List<Contact> getContacts(String emailAddress) {
        try {
            Optional<User> user = jpaUsers.findByEmailAddress(emailAddress);
            return user.get().getContacts();
        }catch (Error e){
            System.out.println(e);
        }
        return null;
    }
}
