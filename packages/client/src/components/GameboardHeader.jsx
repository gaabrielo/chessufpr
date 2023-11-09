import { Cog6ToothIcon } from '@heroicons/react/24/outline';
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
    <header className="w-full border-b border-b-zinc-700">
      <div className="w-full px-4 py-3 flex gap-4 items-center justify-end max-md:justify-between">
        <button className="bg-orange-600 hover:bg-orange-600/90 transition-all flex flex-col gap-1 items-center text-white font-semibold border-orange-700 border-b-4 px-3 py-4 hover:border-b-4 hover:border-b-orange-700 rounded-lg">
          <span className="leading-3">Iniciar partida</span>
          <span className="font-normal leading-3 text-sm">
            aguardando jogadores...
          </span>
        </button>

        {/* <button className="text-gray-300 transition-all hover:text-gray-50">
          <Cog6ToothIcon className="w-8 h-8" />
        </button> */}
        <button className="bg-zinc-700 hover:bg-zinc-600 transition-all flex flex-col gap-1 items-center text-white font-semibold border-orange-700 border-b-4 px-3 py-4 hover:border-b-4 hover:border-b-orange-700 rounded-lg">
          <span className="leading-3">Configurações</span>
          {/* <span className="font-normal leading-3 text-sm">
            aguardando jogadores...
          </span> */}
        </button>
      </div>
    </header>
  );
};

export default GameboardHeader;
