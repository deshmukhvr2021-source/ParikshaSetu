package com.exam.student.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.exam.student.model.Question;

import java.util.List;

public interface QuestionRepository extends JpaRepository<Question, Long> {

    List<Question> findByExamId(Long examId);
}
