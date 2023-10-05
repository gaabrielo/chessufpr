import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const GameboardHeader = () => {
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const handleLeaveChat = () => {
    localStorage.removeItem('userName');
    navigate('/');
    window.location.reload();
  };

  return (
    <header className="w-full p-6 pb-0 text-left">
      <button className="text-red-600" onClick={handleLeaveChat}>
        {'Sair da sessão'}
      </button>
      {/* <form className="form" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Write message"
          className="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="sendBtn">SEND</button>
      </form> */}
    </header>
  );
};

export default GameboardHeader;
