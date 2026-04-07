# 🌐 CampusConnect Web Application

CampusConnect is a full-stack web application designed for Students, HR, and Admin to manage campus activities including internships, placements, notes, notices, profiles, and events.

🔗 Live Links

Frontend: https://campusconnect-web.vercel.app

Backend API: https://campusconnect-backend-3s6m.onrender.com

---

## 🚀 Features

### 👩‍🎓 Student
- View internships
- Apply for internships
- View notes, notices, events
- Access personalized dashboard
- View placements
- Update profile (except name & role)

### 👩‍💼 HR
- Add internships & placements
- Manage internship data
- View student applications

### 🛠️ Admin
- Full control panel
- Add/Edit/Delete:
  - Internships  
  - Placements  
  - Notes  
  - Users  
  - Events  
- Manage entire application data

---

## 🧩 Tech Stack

### **Frontend**
- React.js  
- HTML, CSS, JavaScript  
- React Router  
- AOS.js (Animations)

### **Backend**
- Node.js + Express.js  
- MongoDB + Mongoose  
- JSON Web Token (JWT)

---

## 📁 Folder Structure

campusconnect-react/ → Frontend (React)
campusconnect-backend/ → Backend (Node.js + Express)


---

## ⚙️ Installation & Setup

### 🖥️ Clone Repository

```bash
git clone https://github.com/sneha-gupta-23/Campus-Connect-Web-Application.git

🎨 Frontend Setup
cd campusconnect-react
npm install
npm run dev


🛠️ Backend Setup
cd campusconnect-backend
npm install
node server.js


🔐 Authentication (JWT)

Login & Register with role-based access

Secret keys for Admin & HR

Students have normal registration flow


🎯 Role-Based Access Control

| Feature           | Student | HR | Admin |
| ----------------- | ------- | -- | ----- |
| View Internships  | ✔       | ✔  | ✔     |
| Apply Internship  | ✔       | ✖  | ✖     |
| Add Internship    | ✖       | ✔  | ✔     |
| Edit Internship   | ✖       | ✖  | ✔     |
| Delete Internship | ✖       | ✖  | ✔     |
| Notes Upload      | ✔       | ✔  | ✔     |
| Notes Delete      | ✖       | ✖  | ✔     |

 

Modern UI inspired by CampusConnection

Responsive mobile + desktop layout

Clean green theme with animations

Navigation bar, Hero, Services, Gallery, Events, Footer

Dynamic dashboard for each role



⭐ Show Your Support

If you like this project, please ⭐ the repository!
