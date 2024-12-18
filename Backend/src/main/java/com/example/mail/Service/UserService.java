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

    public boolean saveFolder(String emailAddress, String name) {
        Optional<User> user = jpaUsers.findByEmailAddress(emailAddress);
        if (user.isPresent()) {
            user.get().addFolders(name);
            jpaUsers.save(user.get());
            return true;
        }
        return false;

    }

    public boolean modifyFolder(String emailAddress, String oldName, String newName) {
        Optional<User> user = jpaUsers.findByEmailAddress(emailAddress);
        if (user.isPresent()) {
            user.get().modifyFolder(oldName, newName);
            jpaUsers.save(user.get());
            return true;
        }
        return false;
    }

    public boolean deleteFolder(String emailAddress, String name) {
        Optional<User> user = jpaUsers.findByEmailAddress(emailAddress);
        if (user.isPresent()) {
            user.get().deleteFolder(name);
            jpaUsers.save(user.get());
            return true;
        }
        return false;
    }

    public List<String> getFolders(String emailAddress) {
        Optional<User> user = jpaUsers.findByEmailAddress(emailAddress);
        if (user.isPresent()) {
            return user.get().getFolders();
        }
        return null;
    }
}
