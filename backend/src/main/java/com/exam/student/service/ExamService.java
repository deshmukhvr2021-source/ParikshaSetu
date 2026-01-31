package com.exam.student.service;

import com.exam.student.model.Exam;
import com.exam.student.model.Question;
import com.exam.student.repository.ExamRepository;
import com.exam.student.repository.QuestionRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExamService {

    private final ExamRepository examRepository;
    private final QuestionRepository questionRepository;

    public ExamService(ExamRepository examRepository, QuestionRepository questionRepository) {
        this.examRepository = examRepository;
        this.questionRepository = questionRepository;
    }

    public Exam createExam(Exam exam) {
        return examRepository.save(exam);
    }

    public Question addQuestion(Question question) {
        return questionRepository.save(question);
    }

    public List<Exam> getAllExams() {
        return examRepository.findAll();
    }

    public Exam getExamById(Long id) {
        return examRepository.findById(id).orElseThrow(() -> new RuntimeException("Exam not found"));
    }

    public List<Question> getQuestionsByExamId(Long examId) {
        return questionRepository.findByExamId(examId);
    }

    public Exam publishExam(Long id) {
        Exam exam = getExamById(id);
        exam.setStatus("PUBLISHED");
        return examRepository.save(exam);
    }

    public List<Exam> getPublishedExams() {
        return examRepository.findAll().stream()
                .filter(exam -> "PUBLISHED".equals(exam.getStatus()))
                .collect(java.util.stream.Collectors.toList());
    }

    public Exam updateExam(Long id, Exam updatedExam) {
        Exam exam = getExamById(id);
        if ("PUBLISHED".equals(exam.getStatus())) {
            throw new RuntimeException("Cannot edit published exam");
        }
        exam.setTitle(updatedExam.getTitle());
        exam.setDurationMinutes(updatedExam.getDurationMinutes());
        exam.setTotalMarks(updatedExam.getTotalMarks());
        return examRepository.save(exam);
    }

    public List<java.util.Map<String, Object>> getExamResults(Long examId) {
        // This would ideally use StudentExamRepository
        // For now, return empty list as placeholder
        return new java.util.ArrayList<>();
    }
}
