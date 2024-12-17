package com.example.mail.model;

import com.example.mail.model.Observer;

import java.util.List;

public interface Subject {
    void setObserver(Observer observer);
    void notifyObserver(Boolean updated);
    Observer getObserver();
}
