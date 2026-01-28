package com.exam.student.dto;

import com.exam.student.model.*;

public class EvaluationRequest {

    private Student student;
    private Exam exam;

    public Student getStudent() {
        return student;
    }

    public Exam getExam() {
        return exam;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public void setExam(Exam exam) {
        this.exam = exam;
    }
}


	
	


