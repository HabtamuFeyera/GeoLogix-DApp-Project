import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import axios from 'axios';

const AddDeviceScreen = () => {
  const [deviceAddress, setDeviceAddress] = useState('');

  const addDevice = async () => {
    try {
      await axios.post('http://localhost:3000/addDevice', { deviceAddress });
      alert('Device added successfully!');
      setDeviceAddress('');
    } catch (error) {
      alert('Failed to add device.');
    }
  };

  return (
    <View>
      <Text>Device Address:</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
        value={deviceAddress}
        onChangeText={setDeviceAddress}
      />
      <Button title="Add Device" onPress={addDevice} />
    </View>
  );
};

export default AddDeviceScreen;
