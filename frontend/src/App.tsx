import React, { useState, useEffect } from 'react';

import './App.css';
import UpdateForm from './components/updateform';

const App: React.FC = () => {
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    const eventSource = new EventSource('http://localhost:3000/subscriber/notifications');
    
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setNotifications((prevNotifications) => [...prevNotifications, data]);
    };

    eventSource.onerror = () => {
      console.error('EventSource failed');
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div className="App">
      <h1>Publisher-Subscriber App</h1>
      <UpdateForm />
      <h2>Notifications</h2>
      <ul>
        {notifications.map((notification, index) => (
          <li key={index}>
            <strong>{notification.title}:</strong> {notification.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
