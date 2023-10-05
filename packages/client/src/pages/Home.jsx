import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';

const Home = ({ socket }) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('userName', userName);
    //sends the username and socket ID to the Node.js server
    socket.emit('newUser', { userName, socketID: socket.id });
    navigate('/match');
  };

  return (
    <form className="w-full h-full" onSubmit={handleSubmit}>
      <Header />
      <h2 className="text-xl my-8">Entrar na sessão</h2>

      <div className="flex flex-col text-left w-full max-w-sm mx-auto px-6">
        <label htmlFor="username">Nome de usuário: </label>

        <div className="flex gap-2">
          <input
            type="text"
            minLength={6}
            name="username"
            id="username"
            className="rounded-lg p-2 w-full"
            placeholder=""
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <button className="bg-[#3b3b3b] px-4 rounded-lg">ENTRAR</button>
        </div>
      </div>
    </form>
  );
};

export default Home;
