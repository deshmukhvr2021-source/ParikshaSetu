package com.exam.student.service;

import org.springframework.stereotype.Service;
import java.util.List;

import com.exam.student.model.Exam;
import com.exam.student.repository.ExamRepository;

@Service
public class ExamService {

    private final ExamRepository examRepository;

    public ExamService(ExamRepository examRepository) {
        this.examRepository = examRepository;
    }

    public Exam createExam(Exam exam) {
        return examRepository.save(exam);
    }

    public List<Exam> getAllExams() {
        return examRepository.findAll();
    }
}
