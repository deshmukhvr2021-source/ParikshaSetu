package com.exam.student.controller;

import org.springframework.web.bind.annotation.*;

import com.exam.student.dto.EvaluationRequest;
import com.exam.student.model.*;
import com.exam.student.service.ResultService;

@RestController
@RequestMapping("/api/results")
public class ResultController {

    private final ResultService resultService;

    public ResultController(ResultService resultService) {
        this.resultService = resultService;
    }

    @PostMapping("/evaluate")
    public Result evaluate(@RequestBody EvaluationRequest request) {
        return resultService.evaluateExam(request.getStudent(), request.getExam());
    }
}
