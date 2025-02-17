# Frontend - Pub/Sub Model with NestJS, Kafka, TypeORM & PostgreSQL

This repository contains the **Frontend** for the **Pub/Sub** application that interacts with a NestJS backend using Kafka, TypeORM, and PostgreSQL.

## Features

- **Publisher Interface**: Allows the user to send messages to Kafka, which will be picked up by subscribers.
- **Real-time Subscriber Notifications**: Displays real-time updates using WebSockets whenever a new message is received.
- **Modern UI**: The application uses Material UI for an aesthetically pleasing and responsive design.

## Tech Stack

- **Frontend Framework**: React.js (or Vue.js, depending on your choice).
- **Real-time Communication**: WebSockets for receiving real-time updates from Kafka.
- **UI Library**: Material UI for modern components.
- **HTTP Requests**: Axios for making requests to the backend.

## Getting Started

### Prerequisites

- **Node.js**: >= 14.x
- **Kafka**: A running Kafka instance to publish/consume messages.
- **Backend**: NestJS backend running on [http://localhost:3000](http://localhost:3000).
  
### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo/frontend.git
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up the environment variables by creating a `.env` file in the root of your project:

   ```bash
   REACT_APP_BACKEND_URL=http://localhost:3000
   REACT_APP_KAFKA_SERVER=localhost:9092
   ```

4. Start the development server:

   ```bash
   npm start
   ```

5. Open your browser and visit [http://localhost:3000](http://localhost:3000).

## Usage

1. **Publish a Message**: On the homepage, you can send a message by entering text in the input field and clicking the "Publish" button. This will send a message to the Kafka publisher via the backend.
   
2. **Subscribe and Receive Real-time Updates**: As a subscriber, the frontend listens for updates using WebSockets and displays the message content as soon as it's received.

3. **View Logs**: After publishing a message, you should see logs in the browser console indicating that the subscriber has received the message.

## Code Structure

```
frontend/
│
├── public/                   # Static assets
├── src/                      # Application source code
│   ├── components/           # UI components (Button, Form, etc.)
│   ├── hooks/                # Custom React hooks (for WebSocket and Axios)
│   ├── App.js                # Main React app component
│   ├── index.js              # Entry point
│   ├── WebSocketClient.js    # WebSocket connection for receiving messages
│
├── .env                      # Environment variables for Kafka and backend URL
├── package.json              # Project dependencies and scripts
└── README.md                 # This file
```

## Example Usage

1. **Frontend sends a message to Kafka**:

   - When a user clicks "Publish", the frontend sends a POST request to the `/publisher` endpoint on the backend. This message is sent to Kafka for further processing.

2. **Backend notifies frontend of updates**:

   - The frontend listens for updates via WebSockets. When Kafka processes the message, it triggers a real-time notification on the frontend.



---
