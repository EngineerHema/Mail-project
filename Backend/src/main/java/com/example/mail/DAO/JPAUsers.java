package com.example.mail.DAO;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.mail.model.User;
import java.util.List;
import java.util.Optional;

public interface JPAUsers extends JpaRepository<User, Integer> {

    // Find a single user by email address
    Optional<User> findByEmailAddress(String emailAddress);

    // Find multiple users by email addresses

}
