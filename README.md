# Event driven Programming project
This project is developed following the instruction and requirements for our Event-driven-programming

### Milestones
Check out this project branches where we save all code from each milestone we created
- [x] Milestone 1 - Create a working front, backend, and database and do a single basic crud operations
- [x] Milestone 2 - Create a Employee management system that has this tables: Employee, Department, Designation and Assign Designation tables and does all do CRUD operation
- [x] Milestone 3 - still waiting

### Technologies
- React (tailwind, shadcnui, typescript) 
- Java (springboot)
- Mysql
   
## Getting Started

### Prerequisite

- Node v20.9^
- Npm v10.2^
- Java jdk v21.^

### Installation 
First of all get the project by cloning this repository
```
git clone https://github.com/khesir/event-driven-program.git
```
### Frontend 
Frontend
Install the dependencies and run the program
```
 cd event-driven-program/frontend
 npm install
 npm run dev
```
### Database
Create a MySQL database named "backend" before running the backend:
```
CREATE DATABASE backend
```

### Back End
Make sure that you have MySQL running in the background. Navigate to the backend/target directory and run the following command to start the backend:
```
cd backend/target
```

run this command to run the backend in order for this to run
```
java -jar backend-0.0.1-SNAPSHOT.jar
```

Note: If you're using XAMPP, move this project folder inside the htdocs directory and run it to establish a connection to the database.
