import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  const sendMessage = async () => {
    if (inputText.trim() === '') return;

    // Add user message to chat
    setMessages([...messages, { text: inputText, sender: 'user' }]);
    setInputText('');

    try {
      // Send user message to AI assistant API
      const response = await axios.post('/assistant', { query: inputText });

      // Add assistant response to chat
      setMessages([...messages, { text: response.data.response, sender: 'assistant' }]);
    } catch (error) {
      console.error('Error communicating with AI assistant:', error);
      // Add error message to chat
      setMessages([...messages, { text: 'Error communicating with AI assistant', sender: 'assistant' }]);
    }
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  return (
    <div>
      <h1>Refund By Location Web dApp</h1>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ width: '300px', border: '1px solid #ccc', padding: '10px', marginBottom: '10px', height: '300px', overflowY: 'auto' }}>
          {/* Render chat messages */}
          {messages.map((message, index) => (
            <div key={index} style={{ marginBottom: '5px' }}>
              {message.sender === 'user' ? <span style={{ color: 'blue' }}>You: </span> : <span style={{ color: 'green' }}>Assistant: </span>}
              {message.text}
            </div>
          ))}
        </div>
        {/* Input field for user query */}
        <input type="text" value={inputText} onChange={handleInputChange} />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default App;
