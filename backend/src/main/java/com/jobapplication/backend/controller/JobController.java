package com.jobapplication.backend.controller;

import com.jobapplication.backend.model.Job;
import com.jobapplication.backend.service.JobService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/jobs")
@CrossOrigin(origins = "http://localhost:5173")
public class JobController {

    private final JobService jobService;

    public JobController(JobService jobService) {
        this.jobService = jobService;
    }

    @GetMapping
    public List<Job> getAllJobs() {
        return jobService.getAllJobs();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getJobById(
            @PathVariable int id) {

        Job job = jobService.getJobById(id);

        if (job == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(job);
    }

    @PostMapping
    public ResponseEntity<?> addJob(
            @RequestBody Job job) {

        int result = jobService.addJob(job);

        return ResponseEntity.ok(
                Map.of("message", "Job added successfully")
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateJob(
            @PathVariable int id,
            @RequestBody Job job) {

        int result = jobService.updateJob(id, job);

        if (result == 0) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(
                Map.of("message", "Job updated successfully")
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteJob(
            @PathVariable int id) {

        int result = jobService.deleteJob(id);

        if (result == 0) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(
                Map.of("message", "Job deleted successfully")
        );
    }
}