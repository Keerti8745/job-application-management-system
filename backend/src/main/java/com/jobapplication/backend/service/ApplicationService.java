package com.jobapplication.backend.service;

import com.jobapplication.backend.model.JobApplication;
import com.jobapplication.backend.repository.ApplicationRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ApplicationService {

    private final ApplicationRepository applicationRepository;

    public ApplicationService(
            ApplicationRepository applicationRepository) {

        this.applicationRepository = applicationRepository;
    }

    public int applyForJob(int userId, int jobId) {

        return applicationRepository.applyForJob(
                userId,
                jobId
        );
    }

    public List<JobApplication> getApplicationsByUser(
            int userId) {

        return applicationRepository
                .getApplicationsByUser(userId);
    }

    public int updateStatus(int id, String status) {

        return applicationRepository
                .updateStatus(id, status);
    }

    public int deleteApplication(int id) {

        return applicationRepository
                .deleteApplication(id);
    }

    public int getTotalApplications(int userId) {

        return applicationRepository
                .getTotalApplications(userId);
    }

    public int getApplicationsByStatus(
            int userId,
            String status) {

        return applicationRepository
                .getApplicationsByStatus(userId, status);
    }
}