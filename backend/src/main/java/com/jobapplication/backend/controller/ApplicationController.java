package com.jobapplication.backend.controller;

import com.jobapplication.backend.model.JobApplication;
import com.jobapplication.backend.service.ApplicationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/applications")
@CrossOrigin(origins = "http://localhost:5173")
public class ApplicationController {

    private final ApplicationService applicationService;

    public ApplicationController(
            ApplicationService applicationService) {

        this.applicationService = applicationService;
    }

    @PostMapping
    public ResponseEntity<?> applyForJob(
            @RequestBody Map<String, Integer> data) {

        int userId = data.get("userId");
        int jobId = data.get("jobId");

        int result =
                applicationService.applyForJob(
                        userId,
                        jobId
                );

        if (result == 0) {
            return ResponseEntity.badRequest()
                    .body(Map.of(
                            "message",
                            "Already applied for this job"
                    ));
        }

        return ResponseEntity.ok(
                Map.of(
                        "message",
                        "Application submitted successfully"
                )
        );
    }

    @GetMapping("/user/{userId}")
    public List<JobApplication> getUserApplications(
            @PathVariable int userId) {

        return applicationService
                .getApplicationsByUser(userId);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateStatus(
            @PathVariable int id,
            @RequestBody Map<String, String> data) {

        String status = data.get("status");

        int result =
                applicationService
                        .updateStatus(id, status);

        if (result == 0) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(
                Map.of(
                        "message",
                        "Application status updated"
                )
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteApplication(
            @PathVariable int id) {

        int result =
                applicationService
                        .deleteApplication(id);

        if (result == 0) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(
                Map.of(
                        "message",
                        "Application deleted"
                )
        );
    }

    @GetMapping("/dashboard/{userId}")
    public Map<String, Integer> dashboard(
            @PathVariable int userId) {

        return Map.of(
                "total",
                applicationService
                        .getTotalApplications(userId),

                "applied",
                applicationService
                        .getApplicationsByStatus(
                                userId, "APPLIED"
                        ),

                "shortlisted",
                applicationService
                        .getApplicationsByStatus(
                                userId, "SHORTLISTED"
                        ),

                "interview",
                applicationService
                        .getApplicationsByStatus(
                                userId, "INTERVIEW"
                        ),

                "selected",
                applicationService
                        .getApplicationsByStatus(
                                userId, "SELECTED"
                        ),

                "rejected",
                applicationService
                        .getApplicationsByStatus(
                                userId, "REJECTED"
                        )
        );
    }
}