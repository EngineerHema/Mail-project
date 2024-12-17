package com.example.mail.model;

import org.springframework.context.annotation.Bean;

public interface Observer {
    void updateModified();
    void updateMuted();
    boolean getObserverValue();
}
