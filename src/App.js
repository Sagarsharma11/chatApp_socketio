import './App.css';
import Chatbox from './Pages/Chatbox';
import Login from './Pages/Login';
import Chatroom from './Pages/Chatroom'
import {Routes,Route} from 'react-router-dom'

function App() {
 
  return (
    <div className="App">
    <Routes>
      <Route path="/" element={ <Login/> } />
      <Route path="/Chatbox" element={<Chatbox/>} />
      <Route path='/Chatbox/chat-room' element={<Chatroom/>}/>
      {/* <Route path="about" element={ <About/> } />
      <Route path="contact" element={ <Contact/> } /> */}
    </Routes>
  </div>
  );
}

export default App;
