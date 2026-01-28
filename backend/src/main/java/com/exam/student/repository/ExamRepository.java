package com.exam.student.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.exam.student.model.Exam;

public interface ExamRepository extends JpaRepository<Exam, Long> {
}
