package com.exam.student.model;

import jakarta.persistence.*;

@Entity
@Table(name = "students")
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String rollNumber;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    public Student() {}

    public Student(String rollNumber, User user) {
        this.rollNumber = rollNumber;
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public String getRollNumber() {
        return rollNumber;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setRollNumber(String rollNumber) {
        this.rollNumber = rollNumber;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
