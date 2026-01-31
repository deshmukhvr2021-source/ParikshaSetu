package com.exam.student.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "exams")
public class Exam {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private int durationMinutes;

    private LocalDateTime startTime;

    private LocalDateTime endTime;

    @ManyToOne
    @JoinColumn(name = "teacher_id")
    private Teacher teacher;

    @ManyToOne
    @JoinColumn(name = "subject_id")
    private Subject subject;

    @OneToMany(mappedBy = "exam", cascade = CascadeType.ALL, orphanRemoval = true)
    private java.util.List<Question> questions = new java.util.ArrayList<>();

    private int totalMarks;

    private String status; // CREATED, PUBLISHED, CLOSED

    public Exam() {
    }

    public Exam(String title, int durationMinutes, LocalDateTime startTime, LocalDateTime endTime, Teacher teacher) {
        this.title = title;
        this.durationMinutes = durationMinutes;
        this.startTime = startTime;
        this.endTime = endTime;
        this.teacher = teacher;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public int getDurationMinutes() {
        return durationMinutes;
    }

    public LocalDateTime getStartTime() {
        return startTime;
    }

    public LocalDateTime getEndTime() {
        return endTime;
    }

    public Teacher getTeacher() {
        return teacher;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setDurationMinutes(int durationMinutes) {
        this.durationMinutes = durationMinutes;
    }

    public void setStartTime(LocalDateTime startTime) {
        this.startTime = startTime;
    }

    public void setEndTime(LocalDateTime endTime) {
        this.endTime = endTime;
    }

    public void setTeacher(Teacher teacher) {
        this.teacher = teacher;
    }

    public Subject getSubject() {
        return subject;
    }

    public void setSubject(Subject subject) {
        this.subject = subject;
    }

    public int getTotalMarks() {
        return totalMarks;
    }

    public void setTotalMarks(int totalMarks) {
        this.totalMarks = totalMarks;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public java.util.List<Question> getQuestions() {
        return questions;
    }

    public void setQuestions(java.util.List<Question> questions) {
        this.questions = questions;
        for (Question q : questions) {
            q.setExam(this);
        }
    }

    public void addQuestion(Question question) {
        questions.add(question);
        question.setExam(this);
    }

    public void removeQuestion(Question question) {
        questions.remove(question);
        question.setExam(null);
    }
}
