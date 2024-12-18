package com.example.mail.Service.EmailFacade;

import com.example.mail.model.Email;

import java.util.List;

public interface EmailFacade {
    List<Email> modifyEmail(List<Email> emails, String type, String sort,String search, String substring);
}
