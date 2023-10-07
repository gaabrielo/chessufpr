import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Header } from '../components/Header';
import { v4 } from 'uuid';

const Home = ({ onSetUsername, socket }) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState(
    localStorage.getItem('userName') ?? ''
  );
  const { sessionId } = useParams();
  console.log('🚀 ~ file: Home.jsx:9 ~ Home ~ location:', location);

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('userName', userName);

    let newSeshId = v4();

    //sends the username and socket ID to the Node.js server
    socket.emit('newUser', {
      userName: userName,
      socketID: socket.id,
      sessionID: sessionId ?? newSeshId,
      newSesh: !sessionId,
    });

    if (!sessionId) {
      navigate(`/match/${newSeshId}`);
    } else {
      onSetUsername(userName);
    }
  };

  return (
    <form className="w-full h-full" onSubmit={handleSubmit}>
      <Header />
      <h2 className="text-xl my-8 max-w-sm mx-auto">
        {!sessionId
          ? 'Entrar na sessão'
          : 'Escolha um nome de usuário para jogar'}
      </h2>

      <section className="flex flex-col gap-6 max-w-sm mx-auto px-6">
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
        </div>

        {!sessionId && !!userName && (
          <div className="flex flex-col text-left w-full">
            <label htmlFor="username">ID da sessão (opcional): </label>
            <input
              type="text"
              minLength={6}
              name="sessionid"
              id="sessionid"
              className="rounded-lg p-2 w-full"
              placeholder=""
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <span className="pt-2">
              Quer entrar em uma sessão ativa? Insira o código e clique em jogar
            </span>
          </div>
        )}

        {/* <button className="bg-[#3b3b3b] px-2 py-2 rounded-lg">JOGAR</button> */}
        <button className="bg-orange-600 hover:bg-orange-600/90 text-white font-semibold border-orange-700 border-b-4 px-2 py-2 hover:border-b-4 hover:border-b-orange-700 hover: rounded-lg">
          JOGAR
        </button>
      </section>
    </form>
  );
};

export default Home;
