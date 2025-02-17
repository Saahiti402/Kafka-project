import React, { useState } from 'react';
import { triggerUpdate } from '../api/api';

const UpdateForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = await triggerUpdate(title, message);
      console.log('Update triggered successfully:', data);
      setTitle('');
      setMessage('');
    } catch (error) {
      console.error('Error triggering update', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
      </div>
      <button type="submit">Update Database</button>
    </form>
  );
};

export default UpdateForm;
