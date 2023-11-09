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

      <section className="flex flex-col gap-8 max-w-sm mx-auto px-4 mt-8">
        <h2 className="text-xl">Entrar na sessão</h2>

        <div className="flex flex-col gap-2">
          <div className="flex flex-col text-left w-full">
            <label htmlFor="username">Nome de usuário: </label>
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
            {/* <button className="bg-[#3b3b3b] px-4 rounded-lg">ENTRAR</button> */}
          </div>

          <button className="bg-orange-600 hover:bg-orange-600/90 transition-all text-white font-semibold border-orange-700 border-b-4 px-2 py-2 hover:border-b-4 hover:border-b-orange-700 hover: rounded-lg">
            JOGAR
          </button>
        </div>
      </section>
    </form>
  );
};

export default Home;
