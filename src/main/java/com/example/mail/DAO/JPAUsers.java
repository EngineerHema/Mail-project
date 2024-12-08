package com.example.mail.DAO;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.mail.model.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface JPAUsers extends JpaRepository<User, Integer> {

    // JPQL query to find user by emailAddress
    @Query("SELECT u FROM User u WHERE u.emailAddress = :emailAddress")
    Optional<User> findByEmailAddress(@Param("emailAddress") String emailAddress);
}

