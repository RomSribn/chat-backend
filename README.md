# Chat Application Backend

The backend service for the real-time chat application, built with Node.js, Express, Socket.IO, and MongoDB.

## Table of Contents

- [Features](#features)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Socket Events](#socket-events)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Server](#running-the-server)
  - [Environment Variables](#environment-variables)
- [Database](#database)
- [Testing](#testing)
- [Deployment](#deployment)

## Features

- RESTful API for message history
- Real-time messaging with Socket.IO
- MongoDB integration for message persistence
- Input validation with Zod
- TypeScript for type safety
- Docker support for easy deployment

## Architecture

The backend follows a clean architecture approach with clear separation of concerns:

- **Controllers**: Handle HTTP requests and responses
- **Services**: Contain business logic
- **Models**: Define data structures and database schemas
- **Routes**: Define API endpoints
- **Socket**: Handle real-time communication
- **Validations**: Validate input data
- **Utils**: Utility functions

## Project Structure

```
src/
├── controllers/       # API controllers
│   └── chat-controller.ts
├── database/          # Database connection
│   └── mongo-connection.ts
├── models/            # Mongoose models
│   └── message-model.ts
├── routes/            # API routes
│   └── chat-routes.ts
├── services/          # Business logic
│   ├── chat-service.ts
│   └── chat-service.test.ts
├── socket/            # Socket.IO handlers
│   └── socket-server.ts
├── utils/             # Utilities
│   └── logger.ts
├── validations/       # Data validation
│   └── message-validation.ts
└── index.ts           # Application entry point
```

## API Endpoints

| Method | Endpoint | Description | Query Parameters |
|--------|----------|-------------|-----------------|
| GET | `/api/messages` | Get message history | `offset`: Number of messages to skip<br>`limit`: Number of messages to return |

### Example Response

```json
{
  "messages": [
    {
      "_id": "60d21b4667d0d8992e610c85",
      "username": "john_doe",
      "content": "Hello, world!",
      "timestamp": 1624352582000
    }
  ],
  "total": 42
}
```

## Socket Events

### Client to Server

| Event | Payload | Description |
|-------|---------|-------------|
| `send-message` | `{ username: string, content: string }` | Send a new message |

### Server to Client

| Event | Payload | Description |
|-------|---------|-------------|
| `new-message` | `{ _id: string, username: string, content: string, timestamp: number }` | New message notification |
| `error-message` | `{ error: string }` | Error notification |

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
# or
yarn install
```

### Running the Server

#### Development Mode

```bash
npm run dev
# or
yarn dev
```

#### Production Mode

```bash
npm run build
npm start
# or
yarn build
yarn start
```

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```
PORT=4000
APP_MONGO_URI=mongodb://localhost:27017/chat-app
NODE_ENV=development
```

## Database

The application uses MongoDB to store messages. The database schema is defined in `src/models/message-model.ts`.

### Message Schema

| Field | Type | Description |
|-------|------|-------------|
| username | String | The username of the message sender |
| content | String | The content of the message |
| timestamp | Number | The timestamp when the message was sent (milliseconds since epoch) |

## Testing

The project uses Jest for testing. To run the tests:

```bash
npm test
# or
yarn test
```

## Deployment

### Using Docker

A Dockerfile is provided to build a container image:

```bash
# Build the image
docker build -t chat-backend .

# Run the container
docker run -p 4000:4000 -e APP_MONGO_URI=mongodb://mongo:27017/chat-app chat-backend
```

### Using Docker Compose

The backend can be deployed as part of the entire application using Docker Compose. See the root project's README for details.
