package com.exam.student.controller;

import org.springframework.web.bind.annotation.*;
import java.util.List;

import com.exam.student.model.StudentAnswer;
import com.exam.student.repository.StudentAnswerRepository;

@RestController
@RequestMapping("/api/answers")
public class AnswerController {

    private final StudentAnswerRepository answerRepo;

    public AnswerController(StudentAnswerRepository answerRepo) {
        this.answerRepo = answerRepo;
    }

    @PostMapping
    public List<StudentAnswer> submitAnswers(@RequestBody List<StudentAnswer> answers) {
        return answerRepo.saveAll(answers);
    }
}
