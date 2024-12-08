package com.example.mail.DAO;

import com.example.mail.model.Email;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface JPAEmails extends JpaRepository<Email, Integer> {

    // Renamed the method to reflect the camelCase field names in Email entity
    Optional<List<Email>> findByFromAddress(String fromAddress);

    Optional<List<Email>> findByToAddress(String toAddress);

    // Custom query to find emails containing a keyword in the subject
    @Query("SELECT e FROM Email e WHERE e.subject LIKE %?1%")
    Optional<List<Email>> findEmailsBySubjectContaining(String keyword);
}
