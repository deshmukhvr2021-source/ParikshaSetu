package com.exam.student.service;

import org.springframework.stereotype.Service;
import java.util.List;

import com.exam.student.model.*;
import com.exam.student.repository.*;

@Service
public class ResultService {

    private final StudentAnswerRepository answerRepo;
    private final QuestionRepository questionRepo;
    private final ResultRepository resultRepo;

    public ResultService(StudentAnswerRepository answerRepo,
                         QuestionRepository questionRepo,
                         ResultRepository resultRepo) {
        this.answerRepo = answerRepo;
        this.questionRepo = questionRepo;
        this.resultRepo = resultRepo;
    }

    public Result evaluateExam(Student student, Exam exam) {

        List<Question> questions = questionRepo.findByExamId(exam.getId());
        List<StudentAnswer> answers = answerRepo.findByStudentId(student.getId());

        int correct = 0;

        for (Question q : questions) {
            for (StudentAnswer a : answers) {
                if (a.getQuestion().getId().equals(q.getId())) {
                    if (a.getSelectedAnswer().equals(q.getCorrectAnswer())) {
                        correct++;
                    }
                }
            }
        }

        int total = questions.size();
        int score = (correct * 100) / total;

        Result result = new Result(student, exam, total, correct, score);

        return resultRepo.save(result);
    }
}
