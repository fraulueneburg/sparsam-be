# sparsam - An awesome budgeting app

> [!IMPORTANT]
>
> While this app is no longer in revision, there are still a few minor improvements being implemented here and there. You can follow my progress here or on [Linkedin](https://linkedin.com/in/fraulueneburg)

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

| Name            | Description                                                  |
| :-------------- | :----------------------------------------------------------- |
| **MongoDB:**    | Non-relational database                                      |
| **Node.js:**    | JavaScript runtime environment for server-side development   |
| **Express.js:** | Backend web application framework for Node.js.               |
| **Axios:**      | For uncomplicated HTTP requests to interact with the backend |
| **Node Cron:**  | In case you want the delete-dummy-accounts-after-24h option  |

## 3. Installation

### Clone the repository:

```
git clone https://github.com/fraulueneburg/sparsam-be.git
```

### Install dependencies:

```
npm install mongodb express express-jwt axios bcryptjs cookie-parser cors jsonwebtoken mongoose morgan node-cron
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

| Name                   | Description          |
| :--------------------- | :------------------- |
| `GET /auth/profile`    | Get the user data    |
| `POST /auth/profile`   | Update the user data |
| `DELETE /auth/profile` | Delete user data     |

### Budget-related Endpoints

| Name                                    | Description                          |
| :-------------------------------------- | :----------------------------------- |
| `GET /budget/`                          | Get user’s budget and daily expenses |
| `GET /budget?excludeDailyExpenses=true` | Get user’s budget only               |
| -                                       | -                                    |
| `PUT /budget/currency`                  | Update currency                      |
| -                                       | -                                    |
| `POST /budget/earnings`                 | Add new monthly earning              |
| `PUT /budget/earnings/:earningId`       | Update monthly earning               |
| `DELETE /budget/earnings/:earningId`    | Delete monthly earning               |
| -                                       | -                                    |
| `POST /budget/expenses`                 | Add new monthly expense              |
| `PUT /budget/expenses/:expenseId`       | Update monthly expense               |
| `DELETE /budget/expenses/:expenseId`    | Delete monthly expense               |

### Category-related Endpoints

| Name                                               | Description                                                  |
| :------------------------------------------------- | :----------------------------------------------------------- |
| `POST /categories`                                 | Add new category                                             |
| `PUT /categories/:categoryId`                      | Update category                                              |
| `DELETE /categories/:categoryId`                   | Delete category                                              |
| -                                                  | -                                                            |
| `GET /categories/:categoryId/daily-expenses`       | Get all daily expenses in this category                      |
| `POST /categories/:categoryId/daily-expenses/move` | Move all daily expenses from this category to a new category |
| `DELETE /categories/:categoryId/daily-expenses`    | Delete all daily expenses in this category                   |

### Daily-Expenses-related Endpoints

| Name                                     | Description                       |
| :--------------------------------------- | :-------------------------------- |
| `POST /daily-expenses/`                  | Adds a new daily expense          |
| `PUT /daily-expenses/:dailyExpenseId`    | Updates an existing daily expense |
| `DELETE /daily-expenses/:dailyExpenseId` | Deletes an existing daily expense |

## 5. Team

Sparsam’s code base was completely revised by me, Wiebke, in 2024 and 2025. The very first version of the App started out as a final project at the Ironhack Coding Bootcamp in 2023 and was created in a team with [Michel Saber](https://github.com/michelsaber).

---

## 6. About Me

I’m Wiebke, a Full Stack Web Developer and UI/UX Designer, currently living in Hamburg, Germany.  
Usability is a top priority in my work and I am also strongly advocating for (and keep learning about) web accessibility.

## 7. Like this project? Let’s connect:

<a href="https://linkedin.com/in/fraulueneburg" target="_blank">
<img alt="LinkedIn" src="https://img.shields.io/badge/-linkedin-1572B6?&style=for-the-badge&logo=css3&logoColor=white" />
</a>
