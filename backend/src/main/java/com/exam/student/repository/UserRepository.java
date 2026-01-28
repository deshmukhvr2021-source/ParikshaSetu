package com.exam.student.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.exam.student.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
	
	Optional <User> findByEmail(String email);

}
