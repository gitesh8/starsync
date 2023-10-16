# Starsync - Project Management System

## Introduction

starsync is a versatile project management system designed to streamline your project workflow, offering efficient management for administrators, project managers, and team members. With this system, you can easily create and monitor projects, allocate tasks, and track progress. It provides distinct features tailored for each role, enabling you to collaborate seamlessly.

## Feature Walkthrough

For a detailed demonstration of starsync's features, please check out our [Feature Walkthrough Video](https://youtu.be/YSGc29S1Ey8).

## Key Features

- **User Roles**: starsync supports three user roles: Admin, Project Manager, and Team Member, each with role-specific capabilities.
- **User Registration**: New users can register with their roles (Admin, Project Manager, or Team Member).
- **User Login**: Secure login process that provides access tokens.
- **Profile Information**: Retrieve user profile information, including name, email, and role.

### Admin Features

- **Admin Dashboard**: View project details, the number of projects, team members, project managers, and new projects.
- **Create New Project**: Create new projects, including details like project name, description, start date, end date, and project manager assignment.
- **Get All Projects**: Retrieve a list of all projects.
- **Update Project**: Modify project details.
- **Delete Project**: Remove projects from the system.
- **Get All Project Managers**: List all project managers in the system.

### Project Manager Features

- **Update Project Status**: Update the status of a project.
- **Get Team Members**: Retrieve a list of team members.
- **Get Projects**: List projects assigned to the project manager.
- **Add Tasks to Project**: Assign tasks to projects.
- **Get Project Tasks**: Retrieve tasks associated with a project.

### Team Member Features

- **Get Tasks**: Retrieve tasks assigned to a team member.
- **Update Task Status**: Change the status of a task.

## Design Approach and Assumptions

Our design approach focuses on user roles and their specific needs. We assume that users have a basic understanding of project management principles. Additionally, we assume that users will access the system through a web browser.

## Installation & Getting Started

1. Clone the starsync repository from GitHub.
2. Navigate to the project's root directory.
3. Set up the Flask backend and Angular frontend as specified in their respective README files.
4. Configure your MySQL database with the required tables and data.
5. Start the Flask server and Angular development server.
6. Access the project management system through your web browser.

## User Journey

The typical user journey involves the following steps:

1. Register a new user with the desired role.
2. Log in with your credentials to access the system.
3. Based on your role (Admin, Project Manager, or Team Member), utilize the features tailored to your responsibilities.
4. Create, manage, and monitor projects, assign tasks, and collaborate with team members.

## API Endpoints

### General Endpoints

- **Get Role**: GET /role - Retrieves the role of the authenticated user.
- **Register**: POST /register - Registers a new user with a specified role.
- **Log In**: POST /login - Allows a user to log in and receive an access token.
- **Profile**: POST /profile - Retrieves the profile information of the authenticated user.

### Admin Endpoints

- **Admin Dashboard**: GET /admin/dashboard - Retrieves project details for the admin user.
- **Create New Project**: POST /admin/project/new - Creates a new project by an admin user.
- **Get All Projects**: GET /admin/projects - Retrieves a list of all projects for the admin user.
- **Update Project**: PUT /admin/projects/update/<int:id> - Updates project details by an admin user.
- **Delete Project**: DELETE /admin/projects/delete/<int:id> - Deletes a project by an admin user.
- **Get All Project Managers**: GET /admin/get-all-project-managers - Retrieves a list of all project managers for the admin user.

### Project Manager Endpoints

- **Update Project Status**: GET /manager/project/<int:project_id>/update-status/<string:status> - Allows a project manager to update the status of a project.
- **Get Team Members**: GET /manager/team-members - Retrieves a list of team members for a project manager.
- **Get Projects**: GET /manager/projects - Retrieves a list of projects assigned to a project manager.
- **Add Tasks to Project**: POST /manager/project/add-tasks - Allows a project manager to add tasks to a project.
- **Get Project Tasks**: GET /manager/projects/tasks/<int:project_id> - Retrieves tasks associated with a project for a project manager.

### Team Member Endpoints

- **Get Tasks**: GET /team/tasks - Retrieves tasks assigned to a team member.
- **Update Task Status**: GET /team/tasks/<int:task_id>/update-status/<string:status> - Allows a team member to update the status of a task.

## Technology Stack

- Front-end: Angular
- Back-end: Flask
- Database: MySQL
- Additional Components: JWT Authentication, Role-based Access Control

## Support

Thank you for choosing starsync as your project management system. If you have any questions or need further assistance, please contact me.


