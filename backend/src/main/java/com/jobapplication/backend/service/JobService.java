package com.jobapplication.backend.service;

import com.jobapplication.backend.model.Job;
import com.jobapplication.backend.repository.JobRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobService {

    private final JobRepository jobRepository;

    public JobService(JobRepository jobRepository) {
        this.jobRepository = jobRepository;
    }

    public List<Job> getAllJobs() {
        return jobRepository.getAllJobs();
    }

    public Job getJobById(int id) {
        return jobRepository.getJobById(id);
    }

    public int addJob(Job job) {
        return jobRepository.addJob(job);
    }

    public int updateJob(int id, Job job) {
        return jobRepository.updateJob(id, job);
    }

    public int deleteJob(int id) {
        return jobRepository.deleteJob(id);
    }
}