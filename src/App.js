import './App.css';
import Chatbox from './Pages/Chatbox';
import Login from './Pages/Login';
import Chatroom from './Pages/Chatroom'
import { Routes, Route } from 'react-router-dom'
import React, { useEffect } from 'react';

function App() {
  useEffect(() => {
    console.log('app component...............................')
    const handleTabClose = event => {
      event.preventDefault();

      console.log('beforeunload event triggered');

      return (event.returnValue =
        'Are you sure you want to exit?');
    };

    window.addEventListener('beforeunload', handleTabClose);

    return () => {
      let data = JSON.parse(localStorage.getItem('USERS'));
      let user = JSON.parse(localStorage.getItem('dataKey')).email
      data.forEach(e => {
        if (e.email === user) {
          e['status'] = false
        }
      });
    };
  }, []);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Chatbox" element={<Chatbox />} />
        <Route path='/Chatbox/chat-room' element={<Chatroom />} />
        {/* <Route path="about" element={ <About/> } />
      <Route path="contact" element={ <Contact/> } /> */}
      </Routes>
    </div>
  );
}

export default App;
