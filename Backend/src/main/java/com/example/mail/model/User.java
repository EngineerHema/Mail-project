package com.example.mail.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.annotation.PostConstruct;
import jakarta.persistence.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Map;

@Entity
public class User {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // Auto-generate the ID
    @Column(name = "user_id")  // Custom column name
    private int id;

    @Column(name = "first_name")  // Custom column name
    private String firstName;

    @Column(name = "last_name")  // Custom column name
    private String lastName;

    @Column(name = "email_address")  // Custom column name
    private String emailAddress;



    @Column(name = "password")  // Custom column name
    private String password;


    @OneToMany(mappedBy = "user" ,cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Contact> contacts;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Email> emails;



    @Column(name = "inbox_observer")
    private boolean inboxObserver;

    @Column(name = "sent_observer")
    private boolean sentObserver;

    @Column(name = "delete_observer")
    private boolean deleteObserver;


    // Getters and Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmailAddress() {
        return emailAddress;
    }

    public void setEmailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
    }

    public List<Email> getEmails() {
        return emails;
    }

    public void setEmails(List<Email> emails) {
        this.emails = emails;
    }


    public void addEmail(Email email) {
        email.setUser(this);
        emails.add(email);
    }

    public List<Contact> getContacts() {
        return contacts;
    }

    public void setContacts(List<Contact> contacts) {
        this.contacts = contacts;
    }

    public void addContact(Contact contact) {
        contact.setUser(this);
        this.contacts.add(contact);
    }


    public void deleteContact(int index) {
        this.contacts.remove(index);
    }

    public void modifyContact(Contact contact, int index) {
        contact.setUser(this);
        this.contacts.set(index, contact);
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }


    public boolean isInboxObserver() {
        return inboxObserver;
    }

    public void setInboxObserver(boolean inboxObserver) {
        this.inboxObserver = inboxObserver;
    }

    public boolean isSentObserver() {
        return sentObserver;
    }

    public void setSentObserver(boolean sentObserver) {
        this.sentObserver = sentObserver;
    }

    public boolean isDeleteObserver() {
        return deleteObserver;
    }

    public void setDeleteObserver(boolean deleteObserver) {
        this.deleteObserver = deleteObserver;
    }

}
