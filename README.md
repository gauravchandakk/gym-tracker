# 💪 Gym Daily Exercise Tracker

A full-stack gym workout tracking web application that allows users to log and manage their daily exercise sessions with complete CRUD functionality.

---

## 🛠️ Tech Stack

**Backend**
- Java 17
- Spring Boot 3.x
- Spring Data JPA + Hibernate
- MySQL 8
- Lombok
- Swagger (OpenAPI)
- Maven

**Frontend**
- React 18
- Vite
- React Router DOM v6
- Axios
- Bootstrap 5
- JavaScript ES6+

---

## ✨ Features

- 🏋️ Log daily workout sessions with title and date
- 💪 Add exercises from a pre-loaded exercise library
- 📊 Track sets, reps and weight for each exercise
- ✅ Mark individual sets as completed
- 📋 View all past workouts
- 🔍 Filter exercises by muscle group
- 📈 Dashboard with total workouts, sets, volume and streak stats
- 🗑️ Edit and delete workouts and exercises

---

## 🗄️ Database Design
workouts
└── workout_exercises
└── sets
exercises (library)
└── linked to workout_exercises

---

## 🚀 Getting Started

### Prerequisites
- Java 17+
- Node.js 18+
- MySQL 8
- Maven

### Backend Setup
```bash
# 1. Create MySQL database
CREATE DATABASE gym_tracker_db;

# 2. Update application.properties
spring.datasource.url=jdbc:mysql://localhost:3306/gym_tracker_db
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD

# 3. Run Spring Boot in IntelliJ
# App starts at http://localhost:8080
```

### Frontend Setup
```bash
# 1. Go to frontend folder
cd gym-tracker-frontend

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev

# App starts at http://localhost:5174
```

### API Documentation
Swagger UI available at:
http://localhost:8080/swagger-ui.html

---

## 📁 Project Structure
gym-tracker/
├── backend/                        # Spring Boot
│   └── src/main/java/com/gym/tracker/
│       ├── controller/             # REST Controllers
│       ├── service/                # Business Logic
│       ├── repository/             # JPA Repositories
│       ├── model/                  # Entity Classes
│       ├── dto/                    # Request/Response DTOs
│       ├── exception/              # Global Exception Handler
│       └── config/                 # CORS Config
│
└── gym-tracker-frontend/           # React + Vite
└── src/
├── components/             # Reusable Components
├── pages/                  # Page Components
├── services/               # Axios API Calls
├── hooks/                  # Custom Hooks
└── utils/                  # Helper Functions

---

## 👨‍💻 Author

**Gaurav Chandak**
- GitHub: [@gauravchandakk](https://github.com/gauravchandakk)

---

## 📌 Future Improvements

- JWT Authentication (Login + Register)
- Trainer and Client role management
- Workout progress charts
- Calendar view of workout history
- Mobile responsive design
- Cloud deployment (Vercel + Render + Railway)