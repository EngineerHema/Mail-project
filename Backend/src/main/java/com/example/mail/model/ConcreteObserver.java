package com.example.mail.model;

import jakarta.persistence.GeneratedValue;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

@Component
@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
public class ConcreteObserver implements Observer {
    private Boolean observerValue = true;

    private final Observer dependentObserver;

    // Constructor-based dependency injection
    @Autowired
    public ConcreteObserver(@Qualifier("dependentObserver") Observer dependentObserver) {
        this.dependentObserver = dependentObserver;
    }

    @Override
    public void updateModified() {
        observerValue = true;
    }

    @Override
    public void updateMuted(){
        observerValue = false;
    }

    @Override
    public boolean getObserverValue() {
        return observerValue;
    }
}
