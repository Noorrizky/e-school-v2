# 🎓 E-School Management System

![Laravel](https://img.shields.io/badge/Laravel-11.x-FF2D20?style=for-the-badge\&logo=laravel\&logoColor=white)
![React](https://img.shields.io/badge/React-18.x-20232A?style=for-the-badge\&logo=react\&logoColor=61DAFB)
![Inertia.js](https://img.shields.io/badge/Inertia.js-Modern_SPA-9553E9?style=for-the-badge\&logo=inertia)
![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_v4-38B2AC?style=for-the-badge\&logo=tailwind-css\&logoColor=white)
![Filament v3](https://img.shields.io/badge/Filament_v3-Admin_Panel-FBBF24?style=for-the-badge)

A modern full-stack **School Management System** built using **Laravel 11**, **FilamentPHP v3**, **React**, and **Inertia.js**. The application follows **Clean Architecture principles**, secure **Role-Based Access Control (RBAC)**, and strong relational database design to provide a scalable and maintainable educational platform.

---

## ✨ Features

### 🛡️ Super Admin (Management Zone)

The Super Admin has complete control over the system and academic data.

#### Master Data Management

* Manage Users
* Manage Roles & Permissions
* Manage Subjects
* Manage Semesters

#### Classroom (Rombel) Management

* Create and manage classrooms
* Assign students to classrooms
* Manage classroom membership

#### Schedule Management

* Create teaching schedules
* Connect:

  * Subject
  * Teacher
  * Classroom
  * Semester

#### Role & Permission System

* Powered by Filament Shield
* Built on Spatie Permission
* Dynamic permission generation
* Fine-grained access control

---

### 👨‍🏫 Teacher (Academic Operations Zone)

Teachers have access only to resources relevant to their assigned teaching responsibilities.

#### Schedule Access

* View personal teaching schedules
* Access assigned classrooms
* View assigned subjects

#### Grade Management

* Input student grades
* Update student grades
* View grade history

#### Security Features

* Teachers can only manage data related to their assigned schedules
* Other teachers' data is hidden automatically
* Implemented using Eloquent Query Scopes and Policies

---

### 👨‍🎓 Student (Frontend Zone)

Students access academic information through a modern SPA dashboard.

#### Dashboard Features

* View schedules
* View grades
* Academic progress monitoring
* Responsive interface

#### Security

* No access to Filament Admin Panel
* Read-only data access
* Data filtered based on student account and classroom assignment

---

## 🏗️ System Architecture

```text
┌─────────────────────┐
│     Super Admin     │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│   Filament Admin    │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Laravel Application │
├─────────────────────┤
│ Users               │
│ Roles & Permissions │
│ Classrooms          │
│ Subjects            │
│ Schedules           │
│ Grades              │
└──────────┬──────────┘
           │
 ┌─────────┴─────────┐
 ▼                   ▼

Teachers        Students
(Filament)      (React SPA)
```

---

## 🛠️ Tech Stack

### Backend

* Laravel 11.x
* PHP 8.2+
* MySQL
* Eloquent ORM

### Admin Panel

* FilamentPHP v3
* Filament Shield
* Spatie Permission

### Frontend

* React 18
* Inertia.js
* Tailwind CSS v4

### Security

* Role-Based Access Control (RBAC)
* Laravel Policies
* Eloquent Query Scopes
* Foreign Key Constraints

---

## 🗄️ Database Design

The application uses a relational database structure with strict integrity rules.

### Core Entities

* Users
* Roles
* Permissions
* Subjects
* Semesters
* Classrooms (Rombel)
* Schedules
* Grades

### Relationships

```text
User
 ├── Teacher
 └── Student

Classroom
 └── Students

Schedule
 ├── Subject
 ├── Teacher
 └── Classroom

Grade
 ├── Student
 ├── Subject
 └── Teacher
```

---

## 🚀 Installation

### Prerequisites

Before installing, make sure you have:

* PHP 8.2+
* Composer
* Node.js
* NPM
* MySQL

---

### 1. Clone Repository

```bash
git clone https://github.com/yourusername/e-school.git
cd e-school
```

### 2. Install Dependencies

```bash
composer install
npm install
```

### 3. Environment Configuration

```bash
cp .env.example .env
php artisan key:generate
```

Configure your database credentials inside:

```env
DB_DATABASE=
DB_USERNAME=
DB_PASSWORD=
```

### 4. Run Database Migration

```bash
php artisan migrate
```

### 5. Generate Filament Shield Permissions

```bash
php artisan shield:generate --all
```

### 6. Create Super Admin

```bash
php artisan shield:super-admin
```

### 7. Start Development Server

```bash
php artisan serve
npm run dev
```

---

## 🌐 Application Endpoints

| Module            | URL                             |
| ----------------- | ------------------------------- |
| Landing Page      | http://localhost:8000           |
| Login             | http://localhost:8000/login     |
| Student Dashboard | http://localhost:8000/dashboard |
| Admin Panel       | http://localhost:8000/admin     |

---

## 🔒 Access Control Matrix

| Feature            | Super Admin | Teacher | Student |
| ------------------ | ----------- | ------- | ------- |
| Manage Users       | ✅           | ❌       | ❌       |
| Manage Roles       | ✅           | ❌       | ❌       |
| Manage Subjects    | ✅           | ❌       | ❌       |
| Manage Classrooms  | ✅           | ❌       | ❌       |
| Manage Schedules   | ✅           | ❌       | ❌       |
| Input Grades       | ❌           | ✅       | ❌       |
| View Own Schedule  | ✅           | ✅       | ✅       |
| View Grades        | ✅           | ✅       | ✅       |
| Access Admin Panel | ✅           | ✅       | ❌       |

---

## 📸 Screenshots

```md
![Dashboard](docs/images/dashboard.png)
![Admin Panel](docs/images/admin-panel.png)
![Grade Management](docs/images/grades.png)
```

---

## 📈 Future Improvements

* Attendance Management
* Assignment Submission
* Online Examination Module
* Academic Reports Export (PDF/Excel)
* Parent Portal
* Notifications System
* Student Performance Analytics

---

## 👨‍💻 Author

**Noor Rizky Permana**

AWS re/Start Graduate • Laravel Developer • Full Stack Web Developer

---

## 📄 License

This project is licensed under the MIT License.

```text
MIT License © 2026 Noor Rizky Permana
```

---

⭐ If you find this project useful, consider giving it a star on GitHub.
