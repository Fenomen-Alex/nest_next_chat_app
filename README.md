
# Nest Next Chat App

Nest Next Chat App is a full-stack application built with NestJS, NextJS, and PostgreSQL. It features real-time chat functionality using WebSockets, secure authentication with JWT, and a responsive UI with TailwindCSS.

## Features

- Real-time text and video chat with rooms
- Secure authentication using JWT
- Responsive UI with dark/light themes
- Dockerized for easy setup and deployment

## Project Structure

```
nest_next_chat_app/
│
├── backend/
│   ├── src/
│   │   ├── auth/
│   │   ├── chat/
│   │   ├── app.module.ts
│   │   ├── main.ts
│   │   └── ...
│   ├── Dockerfile
│   └── package.json
│
├── frontend/
│   ├── pages/
│   │   ├── ...
│   ├── styles/
│   │   ├── globals.css
│   │   └── ...
│   ├── Dockerfile
│   └── package.json
│
├── docker-compose.yml
└── README.md
```

## Prerequisites

- Docker and Docker Compose installed on your machine
- Node.js and npm (for local development)

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd nest_next_chat_app
```

### 2. Set Up Environment Variables

Create a `.env` file in the project root with the following content:

```
DATABASE_URL=
```

### 3. Build and Run with Docker

```bash
docker-compose up --build
```

### 4. Access the Application

- Backend: `http://localhost:3000`
- Frontend: `http://localhost:3001`
- pgAdmin: Connect to `localhost:5432` with the credentials specified in the `.env` file

## Development

### Backend

- Navigate to the `backend` directory and install dependencies:

  ```bash
  cd backend
  npm install
  ```

- Start the NestJS server:

  ```bash
  npm run start:dev
  ```

### Frontend

- Navigate to the `frontend` directory and install dependencies:

  ```bash
  cd frontend
  npm install
  ```

- Start the NextJS development server:

  ```bash
  npm run dev
  ```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.

```

This `README.md` file provides a basic overview of your project and instructions for setting it up. You can customize it further based on your specific needs and preferences. If you have any questions or need further assistance, feel free to ask!
