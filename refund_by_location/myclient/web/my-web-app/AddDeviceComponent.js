import React, { useState } from 'react';
import axios from 'axios';

const AddDeviceComponent = () => {
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
    <div>
      <h2>Add Device</h2>
      <label>Device Address:</label>
      <input type="text" value={deviceAddress} onChange={(e) => setDeviceAddress(e.target.value)} />
      <button onClick={addDevice}>Add Device</button>
    </div>
  );
};

export default AddDeviceComponent;
