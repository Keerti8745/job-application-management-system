package com.jobapplication.backend.model;

public class Job {

    private Integer id;
    private String companyName;
    private String jobTitle;
    private String location;
    private String jobType;
    private Double salary;
    private String description;

    public Job() {
    }

    public Job(Integer id, String companyName, String jobTitle, String location,
               String jobType, Double salary, String description) {
        this.id = id;
        this.companyName = companyName;
        this.jobTitle = jobTitle;
        this.location = location;
        this.jobType = jobType;
        this.salary = salary;
        this.description = description;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getJobTitle() {
        return jobTitle;
    }

    public void setJobTitle(String jobTitle) {
        this.jobTitle = jobTitle;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getJobType() {
        return jobType;
    }

    public void setJobType(String jobType) {
        this.jobType = jobType;
    }

    public Double getSalary() {
        return salary;
    }

    public void setSalary(Double salary) {
        this.salary = salary;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}