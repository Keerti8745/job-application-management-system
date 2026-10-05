package com.jobapplication.backend.repository;

import com.jobapplication.backend.model.Job;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class JobRepository {

    private final JdbcTemplate jdbcTemplate;

    public JobRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private final RowMapper<Job> rowMapper = (rs, rowNum) -> {

        Job job = new Job();

        job.setId(rs.getInt("id"));
        job.setCompanyName(rs.getString("company_name"));
        job.setJobTitle(rs.getString("job_title"));
        job.setLocation(rs.getString("location"));
        job.setJobType(rs.getString("job_type"));
        job.setSalary(rs.getDouble("salary"));
        job.setDescription(rs.getString("description"));

        return job;
    };

    public List<Job> getAllJobs() {

        String sql = "SELECT * FROM jobs ORDER BY id DESC";

        return jdbcTemplate.query(sql, rowMapper);
    }

    public Job getJobById(int id) {

        String sql = "SELECT * FROM jobs WHERE id = ?";

        return jdbcTemplate.query(
                sql,
                rowMapper,
                id
        ).stream().findFirst().orElse(null);
    }

    public int addJob(Job job) {

        String sql = """
                INSERT INTO jobs
                (company_name, job_title, location, job_type, salary, description)
                VALUES (?, ?, ?, ?, ?, ?)
                """;

        return jdbcTemplate.update(
                sql,
                job.getCompanyName(),
                job.getJobTitle(),
                job.getLocation(),
                job.getJobType(),
                job.getSalary(),
                job.getDescription()
        );
    }

    public int updateJob(int id, Job job) {

        String sql = """
                UPDATE jobs
                SET company_name = ?,
                    job_title = ?,
                    location = ?,
                    job_type = ?,
                    salary = ?,
                    description = ?
                WHERE id = ?
                """;

        return jdbcTemplate.update(
                sql,
                job.getCompanyName(),
                job.getJobTitle(),
                job.getLocation(),
                job.getJobType(),
                job.getSalary(),
                job.getDescription(),
                id
        );
    }

    public int deleteJob(int id) {

        String sql = "DELETE FROM jobs WHERE id = ?";

        return jdbcTemplate.update(sql, id);
    }
}