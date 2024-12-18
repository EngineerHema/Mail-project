package com.example.mail.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.annotation.PostConstruct;
import jakarta.persistence.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
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


    @Column(name = "folders")
    private List<String> folders;



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



    public List<String> getFolders() {
        return this.folders;
    }

    public void setFolders(List<String> folders) {
        this.folders = folders;
    }

    public void addFolders(String folder) {
        if (this.folders == null){
            this.folders = new ArrayList<>();
        }
        this.folders.add(folder);
    }

    public void deleteFolder(String folder) {
        this.folders.remove(folder);
        for (Email email : emails) {
            List<String> folderNames = email.getFoldersNames();
            for (int i = 0; i < folderNames.size(); i++) {
                if (folderNames.get(i).equals(folder)) {
                    folderNames.remove(i);
                }
            }
        }
    }

    public void modifyFolder(String oldFolder, String newFolder) {
        int index = this.folders.indexOf(oldFolder);
        if (index != -1) {
            // Update the folder name in the list
            this.folders.set(index, newFolder);

            // Iterate over each email and update folder names
            for (Email email : emails) {
                List<String> folderNames = email.getFoldersNames();
                for (int i = 0; i < folderNames.size(); i++) {
                    if (folderNames.get(i).equals(oldFolder)) {
                        folderNames.set(i, newFolder);
                    }
                }
            }
        }
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
