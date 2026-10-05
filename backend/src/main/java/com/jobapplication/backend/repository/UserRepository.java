package com.jobapplication.backend.repository;

import com.jobapplication.backend.model.User;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

@Repository
public class UserRepository {

    private final JdbcTemplate jdbcTemplate;

    public UserRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private final RowMapper<User> rowMapper = (rs, rowNum) -> {

        User user = new User();

        user.setId(rs.getInt("id"));
        user.setName(rs.getString("name"));
        user.setEmail(rs.getString("email"));
        user.setPassword(rs.getString("password"));
        user.setRole(rs.getString("role"));

        return user;
    };

    public int register(User user) {

        String sql = """
                INSERT INTO users
                (name, email, password, role)
                VALUES (?, ?, ?, ?)
                """;

        return jdbcTemplate.update(
                sql,
                user.getName(),
                user.getEmail(),
                user.getPassword(),
                user.getRole()
        );
    }

    public User findByEmail(String email) {

        String sql = "SELECT * FROM users WHERE email = ?";

        return jdbcTemplate.query(
                sql,
                rowMapper,
                email
        ).stream().findFirst().orElse(null);
    }

    public User findById(int id) {

        String sql = "SELECT * FROM users WHERE id = ?";

        return jdbcTemplate.query(
                sql,
                rowMapper,
                id
        ).stream().findFirst().orElse(null);
    }
}