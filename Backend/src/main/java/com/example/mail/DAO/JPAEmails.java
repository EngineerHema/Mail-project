package com.example.mail.DAO;

import com.example.mail.model.Email;
import com.example.mail.model.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface JPAEmails extends JpaRepository<Email, Integer> {

    // Find emails by the "fromAddress"
    Optional<List<Email>> findByFromAddress(String fromAddress);

    Optional <Email> findByUser(User user);


    // Find emails by "toAddress" (which is a comma-separated string stored in the database)
    Optional<List<Email>> findByToAddress(String toAddress);

    // Custom query to find emails containing a keyword in the subject
    @Query("SELECT e FROM Email e WHERE e.subject LIKE %?1%")
    Optional<List<Email>> findEmailsBySubjectContaining(String keyword);

    @Transactional
    @Modifying
    @Query("DELETE FROM Email e WHERE e IN :emails")
    void deleteAll(@Param("emails") List<Email> emails);

}
