# Student-Management-System-CRUD

## Project Summary
This is a simple Student Management System built with the MERN stack (MongoDB, Express.js, React.js, Node.js). The application allows users to create, view, update, and delete student records through a simple and user-friendly web interface. It demonstrates full stack CRUD functionality, API integration, and clean project structure with separate client (frontend) and server (backend) folders.

## Setup Guide:
1.	Clone the repository
•	git clone https://github.com/Delphias/Student-Management-System-CRUD 
•	Run command to navigate to root folder → cd student-management-system\project

2.	Create a .env file with your MongoDB Atlas connection string
•	MONGODB_URL=mongodb+srv://Username:Password@ClusterName.mongodb.net/DatabaseName
•	PORT=7000

3.	Backend setup (server/)
•	Run command from root folder to navigate → cd server
•	Run command → npm install
•	Run command to start the backend (server) → npm start or npm run dev

4.	Front end setup
•	Run command from root folder to navigate → cd client
•	Run command → npm install
•	Run command to start front-end (UI) → npm run dev

5.	The frontend runs on http://localhost:5173 by default. API requests are proxied to the backend (http://localhost:8000) via vite.config.ts

## Tech Stack
1. MongoDB Atlas → Cloud database for student records
2. Express.js → Backend REST API framework
3. React.js (Vite) → Frontend UI with hooks
4. Node.js → Runtime environment for backend
5. Tailwind CSS → Styling and responsive design

## Challenges Faced: MongoDB Atlas Error
1. Connection errors with MongoDB Atlas when using SRV connection strings.
2. Backend couldn’t connect when cluster IP wasn’t whitelisted.
3. DNS resolution issues caused ECONNREFUSED errors.

## How to Use
1. 	Open the app in your browser.
2. 	Add a new student using the form (click the add student button).
3. 	View all students listed below the form.
4. 	Edit or delete students directly from the list.
