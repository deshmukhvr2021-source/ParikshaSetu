package com.exam.student.model;

import jakarta.persistence.*;

@Entity
@Table(name = "student_answers")
public class StudentAnswer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Student student;

    @ManyToOne
    private Question question;

    private String selectedAnswer;

    public StudentAnswer() {}

    public StudentAnswer(Student student, Question question, String selectedAnswer) {
        this.student = student;
        this.question = question;
        this.selectedAnswer = selectedAnswer;
    }

    public Long getId() {
        return id;
    }

    public Student getStudent() {
        return student;
    }

    public Question getQuestion() {
        return question;
    }

    public String getSelectedAnswer() {
        return selectedAnswer;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public void setQuestion(Question question) {
        this.question = question;
    }

    public void setSelectedAnswer(String selectedAnswer) {
        this.selectedAnswer = selectedAnswer;
    }
}
