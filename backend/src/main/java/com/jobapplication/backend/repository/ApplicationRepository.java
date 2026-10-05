package com.jobapplication.backend.repository;

import com.jobapplication.backend.model.JobApplication;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ApplicationRepository {

    private final JdbcTemplate jdbcTemplate;

    public ApplicationRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public int applyForJob(int userId, int jobId) {

        String checkSql = """
                SELECT COUNT(*)
                FROM applications
                WHERE user_id = ? AND job_id = ?
                """;

        Integer count = jdbcTemplate.queryForObject(
                checkSql,
                Integer.class,
                userId,
                jobId
        );

        if (count != null && count > 0) {
            return 0;
        }

        String sql = """
                INSERT INTO applications
                (user_id, job_id, status)
                VALUES (?, ?, 'APPLIED')
                """;

        return jdbcTemplate.update(
                sql,
                userId,
                jobId
        );
    }

    public List<JobApplication> getApplicationsByUser(int userId) {

        String sql = """
                SELECT
                    a.id,
                    a.user_id,
                    a.job_id,
                    a.status,
                    a.applied_date,
                    j.company_name,
                    j.job_title
                FROM applications a
                JOIN jobs j ON a.job_id = j.id
                WHERE a.user_id = ?
                ORDER BY a.id DESC
                """;

        return jdbcTemplate.query(sql, (rs, rowNum) -> {

            JobApplication application = new JobApplication();

            application.setId(rs.getInt("id"));
            application.setUserId(rs.getInt("user_id"));
            application.setJobId(rs.getInt("job_id"));
            application.setStatus(rs.getString("status"));
            application.setAppliedDate(
                    rs.getString("applied_date")
            );
            application.setCompanyName(
                    rs.getString("company_name")
            );
            application.setJobTitle(
                    rs.getString("job_title")
            );

            return application;
        }, userId);
    }

    public int updateStatus(int id, String status) {

        String sql = """
                UPDATE applications
                SET status = ?
                WHERE id = ?
                """;

        return jdbcTemplate.update(
                sql,
                status,
                id
        );
    }

    public int deleteApplication(int id) {

        String sql = "DELETE FROM applications WHERE id = ?";

        return jdbcTemplate.update(sql, id);
    }

    public int getTotalApplications(int userId) {

        String sql = """
                SELECT COUNT(*)
                FROM applications
                WHERE user_id = ?
                """;

        return jdbcTemplate.queryForObject(
                sql,
                Integer.class,
                userId
        );
    }

    public int getApplicationsByStatus(
            int userId,
            String status) {

        String sql = """
                SELECT COUNT(*)
                FROM applications
                WHERE user_id = ? AND status = ?
                """;

        return jdbcTemplate.queryForObject(
                sql,
                Integer.class,
                userId,
                status
        );
    }
}