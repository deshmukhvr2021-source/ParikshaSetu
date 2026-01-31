# Student Exam Management System

## Prerequisites
- **Java 17** or higher
- **Node.js** & **npm**
- **MySQL Server**

## 1. Database Setup
1. Open your MySQL Workbench or Command Line.
2. Create the database:
   ```sql
   CREATE DATABASE student_exam_system;
   ```
3. The application is configured to use:
   - Username: `root`
   - Password: `Hira@2203`
   - If your credentials differ, update `backend/src/main/resources/application.properties`.

## 2. Run Backend
1. Open a terminal in the `backend` folder.
2. Run the application:
   ```bash
   ./mvnw spring-boot:run
   ```
   (On Windows Command Prompt, you can use `mvnw spring-boot:run` without the `./` if `./` doesn't work, generally `mvnw` script handles it).

   *The backend will start on port 8080.*

## 3. Run Frontend
1. Open a new terminal in the `frontend` folder.
2. Install dependencies (if not done):
   ```bash
   npm install
   ```
3. Start the dev server:
   ```bash
   npm run dev
   ```
4. Open the link shown (usually `http://localhost:5173`) in your browser.

## Usage
- **Login**: Use the login page.
  - Since it's a fresh DB, you'll need to register a user.
  - While I didn't create a UI registration form in this quick setup (only API), you can use Postman to Register first OR manually insert a user into the DB.
  - **API Registration**: `POST http://localhost:8080/api/auth/register`
    ```json
    {
      "name": "Admin User",
      "email": "admin@test.com",
      "password": "password",
      "role": "ADMIN"
    }
    ```
- **Dashboard**: Once logged in, you will be redirected to your dashboard.
