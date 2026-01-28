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
    public Exam createExam(@RequestBody Exam exam) {
        return examService.createExam(exam);
    }

    @GetMapping
    public List<Exam> getExams() {
        return examService.getAllExams();
    }
}
