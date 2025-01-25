# medical-chatbot

## Project Description

This project implements a **real-time messaging system** for a medical chatbot using **WebSockets**. The system allows users to interact with the chatbot by sending messages and receiving responses instantly.

- **Backend**: Built with **FastAPI** and **WebSocket** for real-time communication.
- **Frontend**: Developed with **React** to provide a simple and modern chat interface.
- **Dockerized**: Both frontend and backend are containerized using **Docker** for easy deployment.

### Features

- Real-time messaging between the user and the bot.
- Random bot responses chosen from a predefined set.
- Clean and modern UI/UX for user interaction.

---

## Setup Instructions

### Prerequisites

Before running the project, ensure you have the following installed:

1. **Docker**
2. **Docker Compose**
3. **Node.js**
4. **Python**

---

### 1. Clone the Repository

Start by cloning the project repository to your local machine:

```bash
git clone https://github.com/Abdelkader-Masteur/medical-chatbot.git
cd medical-chatbot
```

### 2. Run the Project Using Docker

From the root directory of the project, run the following command to build both the frontend and backend Docker images:

```bash
docker-compose build
```

Start both the frontend and backend containers using Docker Compose:

```bash
docker-compose up
```

The frontend will be accessible at `http://localhost:3000` and the backend at `http://localhost:8000`.
