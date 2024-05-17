# Event driven Programming project
This project is developed following the instruction and requirements for our Event-driven-programming.
<br><br>
This project has been de-coupled for cloning reason. (files too large cloning takes mmany minute)
<br>
Check the repo here:

- [Backend](https://github.com/khesir/event-driven-PMS-backend)
- [Frontend](https://github.com/khesir/event-driven-PMS-frontend)

### Technologies
- React (tailwind, shadcnui, typescript) 
- Java (springboot)
- Mysql

## Feature
- Includes Govt ID's
- Adjustments (includes: loans, bonus)
- Tax
- EMS
- JWT Session tokens

## Installation 


### Frontend 
Frontend
Install the dependencies and run the program
```
 cd event-driven-program/frontend
 npm install
 npm run dev
```
### Database
If you don't have the existing database named **backend** then create a MySQL database named **backend** before running the backend:
```
CREATE DATABASE backend
```

### Back End
Change some env files in the backend and match it with your mysql credentials.
To change, navigate to backend/src/main/resources and there you find application.properties file. Change this following information. 
```
spring.datasource.username= <INSERT MYSQL USERNAME>
spring.datasource.password= <INSERT MYSQL PASSWORD>
```


