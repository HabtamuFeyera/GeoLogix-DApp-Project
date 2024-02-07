import React from 'react';
import axios from 'axios';

const UpdateLocationComponent = () => {
  const updateLocation = async () => {
    try {
      // Implement logic to get current location and timestamp
      const latitude = 0; // Example latitude
      const longitude = 0; // Example longitude
      const timestamp = Date.now(); // Example timestamp

      await axios.post('http://localhost:3000/updateLocation', { latitude, longitude, timestamp });
      alert('Location updated successfully!');
    } catch (error) {
      alert('Failed to update location.');
    }
  };

  return (
    <div>
      <h2>Update Location</h2>
      <button onClick={updateLocation}>Update Location</button>
    </div>
  );
};

export default UpdateLocationComponent;
