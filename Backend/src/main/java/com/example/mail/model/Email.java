package com.example.mail.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Email {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "email_id")
    private int id;

    @Column(name = "subject")
    private String subject;

    @Column(name = "time_stamp")
    private LocalDateTime timeStamp;

    @Column(name = "from_address")
    private String fromAddress;

    @Column(name = "to_address")
    private String toAddress;

    @Column(name = "priority")
    private String priority;

    @Column(name = "body")
    private String body;

    @OneToMany(mappedBy = "email", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Attachment> attachments = new ArrayList<>();

    @Column(name = "type")
    private String type;


    @Column(name = "folders_names")
    private List<String> foldersNames;

    @Column(name = "single_address_draft")
    private String singleAddressDraft;

    @ElementCollection
    @CollectionTable(name = "email_to_address_draft", joinColumns = @JoinColumn(name = "email_id"))
    @Column(name = "to_address_draft")
    private List<String> toAddressDraft = new ArrayList<>();

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "user_id", referencedColumnName = "user_id")
    @JsonBackReference
    private User user;

    // Getters and Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public LocalDateTime getTimeStamp() {
        return timeStamp;
    }

    public void setTimeStamp(LocalDateTime timeStamp) {
        this.timeStamp = timeStamp;
    }

    public String getFromAddress() {
        return fromAddress;
    }

    public void setFromAddress(String fromAddress) {
        this.fromAddress = fromAddress;
    }

    public String getToAddress() {
        return toAddress;
    }

    public void setToAddress(String toAddress) {
        this.toAddress = toAddress;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public List<Attachment> getAttachments() {
        return attachments;
    }

    public void setAttachments(List<Attachment> attachments) {
        this.attachments = attachments;
    }

    public void addAttachment(Attachment attachment) {
        attachment.setEmail(this);
        attachments.add(attachment);
    }

    public List<String> getFoldersNames() {
        if (this.foldersNames == null){
            this.foldersNames = new ArrayList<>();
        }
        return foldersNames;
    }

    public void addFoldersName(String foldersName) {
        if (this.foldersNames == null){
            this.foldersNames = new ArrayList<>();
        }
        this.foldersNames.add(foldersName);
    }

    public void removeFoldersName(String foldersName) {
        if (this.foldersNames == null){
            this.foldersNames = new ArrayList<>();
        }
        this.foldersNames.remove(foldersName);
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getSingleAddressDraft() {
        return singleAddressDraft;
    }

    public void setSingleAddressDraft(String singleAddressDraft) {
        this.singleAddressDraft = singleAddressDraft;
    }

    public List<String> getToAddressDraft() {
        return toAddressDraft;
    }

    public void setToAddressDraft(List<String> toAddressDraft) {
        this.toAddressDraft = toAddressDraft;
    }
}

