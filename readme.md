# [IN REVISION] 👷🐽<br />sparsam - An awesome budgeting app

> [!IMPORTANT]
> Please note that this project is currently in revision. The demo still works, of course. You can follow my progress here or on [Linkedin](https://linkedin.com/in/fraulueneburg)

## Demo

### See the Demo at <span style="speak_ none">👉&nbsp;&nbsp;</span>See the demo at&nbsp;&nbsp;[sparsam.netlify.app/](https://sparsam.netlify.app/)

## Description

This application handles the **backend** of the sparsam budgeting app. [See the frontend here.](https://github.com/fraulueneburg/sparsam-fe)

## Code

- Frontend at https://github.com/fraulueneburg/sparsam-fe
- Backend at https://github.com/fraulueneburg/sparsam-be

## Technologies

| Name                 | Description                                                  |
| :------------------- | :----------------------------------------------------------- |
| **Create React App** | Bootstrap code                                               |
| **MongoDB:**         | Non-relational database                                      |
| **Node.js:**         | JavaScript runtime environment for server-side development   |
| **Express.js:**      | Backend web application framework for Node.js.               |
| **Axios:**           | For uncomplicated HTTP requests to interact with the backend |

## Installation

### Clone the repository:

```
git clone https://github.com/fraulueneburg/sparsam-be.git
```

### Install dependencies:

```
npm install mongo-db
npm install express
npm install axios
```

### Set up your backend

- see https://github.com/fraulueneburg/sparsam-be for that

### Set up MongoDB

- Install MongoDB 👉 https://docs.mongodb.com/manual/installation/
- Configure MongoDB connection

### Start the server

- start the server: `npm start`

## API Endpoints

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

## Contributing

Contributions are welcome! If you find a bug or want to add a new feature, please open an issue or submit a pull request.

## Authors

Sparsam is a full stack web app created by [Michel](https://github.com/michelsaber) and [Wiebke](https://github.com/fraulueneburg).
