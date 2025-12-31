package com.example.file_parser.repository;



import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.file_parser.entity.User;



public interface UserRepository extends JpaRepository<User, Long > {

	Optional<User> findByUsername(String username);

	
}
