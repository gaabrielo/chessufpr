import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import SessionPage from './pages/Session';

import socketIO from 'socket.io-client';
const socket = socketIO.connect('http://10.158.60.85:4000');

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col w-full h-full max-h-screen">
        {/*h-full */}
        <div className="w-full h-full">
          {/*h-full */}
          <Routes>
            <Route path="/" element={<Home socket={socket} />}></Route>
            <Route
              path="/match"
              element={<SessionPage socket={socket} />}
            ></Route>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
