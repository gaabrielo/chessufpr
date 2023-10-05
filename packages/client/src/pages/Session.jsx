import ChatBar from '../components/ChatBar';
import Gameboard from '../components/Gameboard';
import GameboardHeader from '../components/GameboardHeader';
import {
  ChatBubbleBottomCenterTextIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

import { UserCircleIcon as UserBlack } from '@heroicons/react/24/outline';
import { UserCircleIcon as UserWhite } from '@heroicons/react/24/solid';
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/solid';

import { Header } from '../components/Header';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { IconButton } from '../components/IconButton';

const SessionPage = ({ socket }) => {
  const navigate = useNavigate();
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleLeaveChat = () => {
    localStorage.removeItem('userName');
    navigate('/');
    window.location.reload();
  };

  const [players, setPlayers] = useState([]);

  useEffect(() => {
    socket.on('newUserResponse', (data) => setPlayers(data));
  }, [socket, players]);

  return (
    <div className="flex flex-col h-full md:h-screen">
      <aside
        className={`w-full h-full fixed top-0 left-0 bg-zinc-800 z-10 transition-transform md:hidden ${
          isChatOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="w-full h-full flex flex-col relative">
          <IconButton
            styles="mr-0 ml-auto absolute right-6 top-6"
            onClick={() => setIsChatOpen(false)}
          >
            <XMarkIcon className="w-5 h-5" />
          </IconButton>

          <ChatBar socket={socket} />
        </div>
      </aside>

      <Header>
        <div className="flex gap-2 w-full">
          <IconButton styles="md:hidden" onClick={() => setIsChatOpen(true)}>
            <ChatBubbleBottomCenterTextIcon className="w-5 h-5" />
          </IconButton>

          <IconButton
            styles="text-red-600 hover:text-red-500 md:mr-0 md:ml-auto"
            onClick={handleLeaveChat}
          >
            <ArrowRightOnRectangleIcon className="w-5 h-5" />
          </IconButton>
        </div>
      </Header>

      <div className="flex h-full max-md:py-2 w-full max-w-[1280px] mx-auto">
        <div className="hidden md:flex">
          <ChatBar socket={socket} />
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center">
              <UserBlack className="h-8 w-8" />
              <span>{players[1]?.userName ?? 'Aguardando jogador...'}</span>
            </div>
            <Gameboard />
            <div className="flex gap-2 items-center">
              <UserWhite className="h-8 w-8" />
              <span>{players[0]?.userName}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionPage;
