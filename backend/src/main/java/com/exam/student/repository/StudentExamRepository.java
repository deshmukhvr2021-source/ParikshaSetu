package com.exam.student.repository;

import com.exam.student.model.StudentExam;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface StudentExamRepository extends JpaRepository<StudentExam, Long> {
    List<StudentExam> findByStudentId(Long studentId);

    List<StudentExam> findByExamId(Long examId);
}
