package com.exam.student.controller;

import com.exam.student.model.*;
import com.exam.student.repository.*;
import com.exam.student.service.ResultService;
import com.exam.student.service.ExamService;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/student")
public class StudentController {

    private final ExamService examService;
    private final StudentExamRepository studentExamRepo;
    private final AnswerRepository answerRepo;
    private final ResultService resultService;
    private final UserRepository userRepo;
    private final StudentRepository studentRepo; // Need to fetch Student entity from User

    public StudentController(ExamService examService, StudentExamRepository studentExamRepo,
            AnswerRepository answerRepo, ResultService resultService,
            UserRepository userRepo, StudentRepository studentRepo) {
        this.examService = examService;
        this.studentExamRepo = studentExamRepo;
        this.answerRepo = answerRepo;
        this.resultService = resultService;
        this.userRepo = userRepo;
        this.studentRepo = studentRepo;
    }

    @PostMapping("/start-exam/{examId}")
    public StudentExam startExam(@PathVariable Long examId, @RequestParam String email) {
        User user = userRepo.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        // Assuming we have a way to get Student from User. For now, let's assume
        // one-to-one mapping logic or just find student by User ID
        // Simplified: StudentRepository finding by User.
        // NOTE: I haven't implemented finding Student by User yet in Repo. I'll just
        // use dummy logic or assume Student ID is passed for now to keep it simple, or
        // better:

        Student student = studentRepo.findAll().stream()
                .filter(s -> s.getUser().getId().equals(user.getId()))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Student profile not found"));

        Exam exam = examService.getExamById(examId);

        StudentExam studentExam = new StudentExam();
        studentExam.setStudent(student);
        studentExam.setExam(exam);
        studentExam.setStartTime(LocalDateTime.now());
        studentExam.setStatus("STARTED");

        return studentExamRepo.save(studentExam);
    }

    @GetMapping("/exam/{studentExamId}")
    public java.util.Map<String, Object> getExamDetails(@PathVariable Long studentExamId) {
        StudentExam studentExam = studentExamRepo.findById(studentExamId)
                .orElseThrow(() -> new RuntimeException("Exam attempt not found"));

        Exam exam = studentExam.getExam();

        // Return exam details with questions (without correct answers for security)
        java.util.Map<String, Object> response = new java.util.HashMap<>();
        response.put("studentExamId", studentExam.getId());
        response.put("examTitle", exam.getTitle());
        response.put("durationMinutes", exam.getDurationMinutes());
        response.put("totalMarks", exam.getTotalMarks());
        response.put("startTime", studentExam.getStartTime());
        response.put("questions", exam.getQuestions());

        return response;
    }

    @PostMapping("/submit-exam/{studentExamId}")
    public Result submitExam(@PathVariable Long studentExamId, @RequestBody List<Answer> answers) {
        StudentExam studentExam = studentExamRepo.findById(studentExamId)
                .orElseThrow(() -> new RuntimeException("Exam attempt not found"));

        studentExam.setSubmitTime(LocalDateTime.now());
        studentExam.setStatus("SUBMITTED");
        studentExamRepo.save(studentExam);

        // Save answers
        for (Answer ans : answers) {
            ans.setStudentExam(studentExam);
            answerRepo.save(ans);
        }

        // Evaluate (Auto for MCQ)
        return resultService.evaluateExam(studentExam.getStudent(), studentExam.getExam());
    }
}
