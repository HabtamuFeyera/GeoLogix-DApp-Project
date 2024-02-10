import React from 'react';
import { View, Text, Button } from 'react-native';
import axios from 'axios';

const UpdateLocationScreen = () => {
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
    <View>
      <Text>Update Location</Text>
      <Button title="Update Location" onPress={updateLocation} />
    </View>
  );
};

export default UpdateLocationScreen;
