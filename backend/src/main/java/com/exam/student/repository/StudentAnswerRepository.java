package com.exam.student.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.exam.student.model.StudentAnswer;

import java.util.List;

public interface StudentAnswerRepository extends JpaRepository<StudentAnswer, Long> {

    List<StudentAnswer> findByStudentId(Long studentId);
}
