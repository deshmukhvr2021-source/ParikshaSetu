package com.exam.student.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.exam.student.model.User;
import com.exam.student.repository.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final org.springframework.security.crypto.password.PasswordEncoder passwordEncoder;
    private final com.exam.student.repository.StudentRepository studentRepository;
    private final com.exam.student.repository.TeacherRepository teacherRepository;

    public UserService(UserRepository userRepository,
            org.springframework.security.crypto.password.PasswordEncoder passwordEncoder,
            com.exam.student.repository.StudentRepository studentRepository,
            com.exam.student.repository.TeacherRepository teacherRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.studentRepository = studentRepository;
        this.teacherRepository = teacherRepository;
    }

    // Create user
    public User saveUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User savedUser = userRepository.save(user);

        // Auto-create Student or Teacher entity based on role
        if ("STUDENT".equals(user.getRole())) {
            com.exam.student.model.Student student = new com.exam.student.model.Student();
            student.setUser(savedUser);
            student.setRollNumber(generateRollNumber());
            studentRepository.save(student);
        } else if ("TEACHER".equals(user.getRole())) {
            com.exam.student.model.Teacher teacher = new com.exam.student.model.Teacher();
            teacher.setUser(savedUser);
            teacher.setSubject("General");
            teacherRepository.save(teacher);
        }

        return savedUser;
    }

    private String generateRollNumber() {
        return "STU" + System.currentTimeMillis();
    }

    // Get all users
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Get user by email
    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    // Delete user
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}
