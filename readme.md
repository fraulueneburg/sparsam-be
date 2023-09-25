# [IN REVISION] 👷🐽<br />sparsam - An awesome budgeting app

> [!IMPORTANT]
> Please note that this project is currently in revision. The demo still works, of course. You can follow my progress here or on [Linkedin](https://linkedin.com/in/fraulueneburg)

---

## Demo

### 👉&nbsp;&nbsp;See the demo at&nbsp;&nbsp;[sparsam-app.netlify.app](https://sparsam-app.netlify.app/)

## Description

This application handles the **backend** of the sparsam budgeting app. [See the frontend here.](https://github.com/fraulueneburg/sparsam-fe)

---

## Content

1. [Code](#1-code)
2. [Technologies](#2-technologies)
3. [Installation](#3-installation)
4. [API Endpoints](#4-api-endpoints)
5. [Team](#5-team)
6. [About me](#6-about-me)
7. [Contact](#7-like-this-project-lets-connect)

## 1. Code

- Frontend at https://github.com/fraulueneburg/sparsam-fe
- Backend at https://github.com/fraulueneburg/sparsam-be

## 2. Technologies

| Name                 | Description                                                  |
| :------------------- | :----------------------------------------------------------- |
| **Create React App** | Bootstrap code                                               |
| **MongoDB:**         | Non-relational database                                      |
| **Node.js:**         | JavaScript runtime environment for server-side development   |
| **Express.js:**      | Backend web application framework for Node.js.               |
| **Axios:**           | For uncomplicated HTTP requests to interact with the backend |

## 3. Installation

### Clone the repository:

```
git clone https://github.com/fraulueneburg/sparsam-be.git
```

### Install dependencies:

```
npm install mongo-db express express-jwt axios bcryptjs cookie-parser cors jsonwebtoken mongoose morgan
```

### Set up your frontend

- see https://github.com/fraulueneburg/sparsam-fe for that

### Set up MongoDB

- Install MongoDB 👉 https://docs.mongodb.com/manual/installation/
- Configure MongoDB connection

### Start the server

- start the server: `npm start`

## 4. API Endpoints

### User-related Endpoints

| Name                          | Description          |
| :---------------------------- | :------------------- |
| `GET /auth/profile`           | Get the user data    |
| `POST /auth/profile`          | Update the user data |
| `DELETE /auth/profile/delete` | Delete user data     |

### Budget-related Endpoints

| Name                    | Description                                     |
| :---------------------- | :---------------------------------------------- |
| `GET /budget/`          | Get the user’s budget and daily expenses        |
| `POST /budget/settings` | Get the user’s budget data                      |
| `POST /budget/create`   | Update budget data / create budget for new user |

### DailyExpenses-related Endpoints

| Name                                         | Description                       |
| :------------------------------------------- | :-------------------------------- |
| `POST /budget/addexpense`                    | Adds a new daily expense          |
| `POST /budget/updateexpense/:dailyExpenseId` | Updates an existing daily expense |
| `DELETE /deleteexpense/:dailyExpenseId`      | Deletes an existing daily expense |

## 5. Team

Sparsam was created in a team with [Michel Saber](https://github.com/michelsaber).

---

## 6. About Me

I’m Wiebke, a Full Stack Web Developer and UI/UX Designer, currently living in Hamburg, Germany.  
Usability is a top priority in my work and I am also strongly advocating for (and keep learning about) web accessibility.

## 7. Like this project? Let’s connect:

<a href="https://linkedin.com/in/fraulueneburg" target="_blank">
<img alt="LinkedIn" src="https://img.shields.io/badge/-linkedin-1572B6?&style=for-the-badge&logo=css3&logoColor=white" />
</a>
