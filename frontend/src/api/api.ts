import axios from 'axios';

export const triggerUpdate = async (title: string, message: string) => {
  try {
    const response = await axios.post('http://localhost:3000/publisher/update', { title, message });
    return response.data;
  } catch (error) {
    console.error('Error triggering update', error);
    throw error;
  }
};
