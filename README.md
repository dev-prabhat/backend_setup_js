# Backend Setup in Node.js

This repository contains the backend setup for a Node.js application, including authentication with JWT, MongoDB integration, and more.

## Table of Contents

- [Backend Setup in Node.js](#backend-setup-in-nodejs)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Prerequisites](#prerequisites)
  - [Getting Started](#getting-started)
    - [Clone the Repository](#clone-the-repository)

## Features

- **Authentication**: Secure user authentication using JWT tokens.
- **MongoDB Integration**: Seamless integration with MongoDB using Mongoose.
- **Environment Variables**: Configuration using environment variables.
- **RESTful API**: Structured and scalable RESTful API design.

## Prerequisites

Ensure you have the following software installed on your machine:

- [Node.js](https://nodejs.org/) (v14.x or later)
- [npm](https://www.npmjs.com/) (v6.x or later) or [yarn](https://yarnpkg.com/) (v1.x or later)
- [MongoDB](https://www.mongodb.com/) (Local or Cloud-based)
- [Git](https://git-scm.com/)

## Getting Started

### Clone the Repository

First, clone the repository to your local machine using the following command:

```bash
git clone https://github.com/dev-prabhat/backend_setup_js.git
```

```bash
cd backend_setup_js
npm install
```
or

```bash
cd backend_setup_js
yarn install
```
Create a .env file in the root of the project and add the following environment variables:

```bash
PORT=8000
MONGODB_URI=mongodb+srv://prabhat:prabhat123@cluster0.ujfze.mongodb.net
ACCESS_TOKEN_SECRET=prabhat
ACCESS_TOKEN_EXPIRE=1d
```

```bash
npm start
```
or 

```bash
yarn start
```

The application will be running at http://localhost:8000.