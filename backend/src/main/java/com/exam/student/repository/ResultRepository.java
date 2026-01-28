package com.exam.student.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.exam.student.model.Result;

import java.util.Optional;

public interface ResultRepository extends JpaRepository<Result, Long> {

    Optional<Result> findByStudentIdAndExamId(Long studentId, Long examId);
}
