# Backend - Pub/Sub Model with NestJS, Kafka, TypeORM & PostgreSQL

This repository contains the **Backend** for the **Pub/Sub** application built using **NestJS**, **Kafka**, **TypeORM**, and **PostgreSQL**.

## Features

- **Kafka Publisher**: Publishes messages to Kafka when the `POST /publisher` endpoint is hit.
- **Kafka Subscriber**: Subscribes to Kafka topics and listens for updates, triggering real-time notifications to connected clients.
- **PostgreSQL Integration**: Uses TypeORM for interacting with the PostgreSQL database to manage messages.
- **WebSocket Support**: Sends real-time updates to frontend clients when new messages are processed.

## Tech Stack

- **NestJS**: Backend framework for building scalable and maintainable applications.
- **Kafka**: Messaging system used for the Pub/Sub model.
- **TypeORM**: ORM to interact with PostgreSQL for storing message data.
- **PostgreSQL**: Relational database for persisting data.
- **WebSockets**: Real-time communication for sending notifications to the frontend.

## Getting Started

### Prerequisites

- **Node.js**: >= 14.x
- **Kafka**: A running Kafka instance on localhost (`localhost:9092` by default).
- **PostgreSQL**: A running PostgreSQL instance.
- **Kafka Topics**: Ensure the Kafka topics are created, such as `database.updated` for message updates.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo/backend.git
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up the environment variables by creating a `.env` file in the root of your project:

   ```bash
   KAFKA_BROKER=localhost:9092
   POSTGRES_HOST=localhost
   POSTGRES_PORT=5432
   POSTGRES_USER=your_user
   POSTGRES_PASSWORD=your_password
   POSTGRES_DB=your_db
   ```

4. Start PostgreSQL and Kafka if they are not running.

5. Start the NestJS application:

   ```bash
   npm run start
   ```

6. The backend will start on [http://localhost:3000](http://localhost:3000).

## Usage

### Publisher Endpoint

- **POST `/publisher`**
  - Publishes a message to Kafka and stores it in the PostgreSQL database.
  - Example request:

    ```json
    {
      "message": "Hello Kafka!"
    }
    ```

  - Example response:

    ```json
    {
      "status": "Message published"
    }
    ```

### Subscriber (Real-time Updates)

- The backend connects to Kafka as a subscriber and listens for messages on the `database.updated` topic. 
- Whenever a new message is published, it triggers WebSocket notifications to the frontend clients.

### WebSocket Communication

- WebSocket is used for pushing real-time notifications to connected clients when messages are received via Kafka.

## Code Structure

```
backend/
│
├── src/                      # Application source code
│   ├── app.module.ts         # Main module, integrates everything
│   ├── publisher/            # Publisher module (handles Kafka publishing)
│   ├── subscriber/           # Subscriber module (handles Kafka consumption)
│   ├── database/             # Database module (TypeORM models and configuration)
│   ├── shared/               # Shared modules and utilities (WebSocket handling)
│   └── main.ts               # Entry point of the application
│
├── .env                      # Environment variables for Kafka and PostgreSQL
├── package.json              # Project dependencies and scripts
├── tsconfig.json             # TypeScript configuration
└── README.md                 # This file
```

## Example Workflow

1. **Publishing a Message**: 
   - A `POST` request is made to the `/publisher` endpoint with the message data. 
   - The backend publishes this message to Kafka and stores the message in the PostgreSQL database.

2. **Kafka Consumption**: 
   - The backend listens for messages from the Kafka topic `database.updated` using the Kafka Consumer.
   - Once a message is consumed, it is sent to connected frontend clients via WebSocket.

3. **Real-Time Update**: 
   - The subscriber module triggers a WebSocket event that notifies the frontend of the new message.

## Testing

1. **Publisher Test**: 
   - Use any HTTP client (e.g., Postman or cURL) to send a `POST` request to `/publisher` with the message body.
   
   Example with cURL:

   ```bash
   curl -X POST http://localhost:3000/publisher -H "Content-Type: application/json" -d '{"message": "Test Message"}'
   ```

2. **Subscriber Test**:
   - Open the frontend application, which should receive real-time updates when a message is published via Kafka.

---
