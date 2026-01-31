package com.exam.student.controller;

import org.springframework.web.bind.annotation.*;
import java.util.List;

import com.exam.student.model.Exam;
import com.exam.student.service.ExamService;

@RestController
@RequestMapping("/api/exams")
public class ExamController {

    private final ExamService examService;

    public ExamController(ExamService examService) {
        this.examService = examService;
    }

    @PostMapping
    @org.springframework.security.access.prepost.PreAuthorize("hasAuthority('TEACHER')")
    public Exam createExam(@RequestBody Exam exam) {
        // Ensure bidirectional relationship if not set by JSON deserialization
        if (exam.getQuestions() != null) {
            for (com.exam.student.model.Question q : exam.getQuestions()) {
                q.setExam(exam);
            }
        }
        return examService.createExam(exam);
    }

    @GetMapping
    public List<Exam> getExams() {
        return examService.getAllExams();
    }

    @GetMapping("/{id}")
    public Exam getExamById(@PathVariable Long id) {
        return examService.getExamById(id);
    }

    @PostMapping("/questions")
    public com.exam.student.model.Question addQuestion(@RequestBody com.exam.student.model.Question question) {
        return examService.addQuestion(question);
    }

    @PatchMapping("/{id}/publish")
    @org.springframework.security.access.prepost.PreAuthorize("hasAuthority('TEACHER')")
    public Exam publishExam(@PathVariable Long id) {
        return examService.publishExam(id);
    }

    @GetMapping("/published")
    public List<Exam> getPublishedExams() {
        return examService.getPublishedExams();
    }

    @PutMapping("/{id}")
    @org.springframework.security.access.prepost.PreAuthorize("hasAuthority('TEACHER')")
    public Exam updateExam(@PathVariable Long id, @RequestBody Exam exam) {
        return examService.updateExam(id, exam);
    }

    @GetMapping("/{id}/results")
    @org.springframework.security.access.prepost.PreAuthorize("hasAuthority('TEACHER')")
    public List<java.util.Map<String, Object>> getExamResults(@PathVariable Long id) {
        return examService.getExamResults(id);
    }
}
