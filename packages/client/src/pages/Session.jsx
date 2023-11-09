import ChatBar from '../components/ChatBar';
import Gameboard from '../components/Gameboard';
import GameboardHeader from '../components/GameboardHeader';
import {
  ArrowTopRightOnSquareIcon,
  ChatBubbleBottomCenterTextIcon,
  Cog6ToothIcon,
  InformationCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

import { UserCircleIcon as UserBlack } from '@heroicons/react/24/outline';
import { UserCircleIcon as UserWhite } from '@heroicons/react/24/solid';
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/solid';

import { Header } from '../components/Header';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { IconButton } from '../components/IconButton';
import { SettingsModal } from '../components/SettingsModal';
import { VictoryModal } from '../components/VictoryModal';

const SessionPage = ({ socket }) => {
  const navigate = useNavigate();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(true);
  const [isVictoryModalOpen, setIsVictoryModalOpen] = useState(false);
  const [victoryMessage, setVictoryMessage] = useState(null);

  const handleLeaveChat = () => {
    localStorage.removeItem('userName');
    navigate('/');
    window.location.reload();
  };

  const [players, setPlayers] = useState([]);
  const [isPlayerBlack, setIsPlayerBack] = useState(false);
  const [isWatcher, setIsWatcher] = useState(true);

  useEffect(() => {
    socket.on('newUserResponse', (data) => {
      const currentPlayers = data.filter((p) => !!p?.player);

      setIsPlayerBack(
        () =>
          data.find((p) => p.userName === localStorage.getItem('userName'))
            ?.player === 2
      );

      setIsWatcher(
        () =>
          typeof currentPlayers.find(
            (p) => p.userName === localStorage.getItem('userName')
          ) !== 'object'
      );

      setPlayers(currentPlayers);
    });
  }, [socket, players]);

  return (
    <div className="flex flex-col h-full md:h-screen relative">
      <SettingsModal
        open={isSettingsModalOpen}
        onClose={setIsSettingsModalOpen}
      />
      <VictoryModal
        open={isVictoryModalOpen}
        onClose={setIsVictoryModalOpen}
        subtitle={victoryMessage?.result ?? ''}
        title={victoryMessage?.message ?? ''}
      />

      <aside
        className={`w-full h-full fixed top-0 left-0 bg-zinc-800 z-20 transition-transform md:hidden ${
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
        <div className="flex gap-2 justify-end w-full">
          <IconButton
            styles="text-red-600 hover:text-red-500"
            onClick={handleLeaveChat}
          >
            <ArrowRightOnRectangleIcon className="w-6 h-6" />
          </IconButton>

          <IconButton styles="md:hidden" onClick={() => setIsChatOpen(true)}>
            <ChatBubbleBottomCenterTextIcon className="w-6 h-6" />
          </IconButton>

          <IconButton
            // styles="md:mr-0 md:ml-auto"
            onClick={() => setIsSettingsModalOpen(true)}
          >
            <InformationCircleIcon className="w-6 h-6" />
          </IconButton>
        </div>
      </Header>
      {/* max-md:py-2 */}
      <div className="flex h-full w-full">
        <div className="hidden md:flex">
          <ChatBar socket={socket} />
        </div>

        <div className="flex-1 flex flex-col items-center">
          {/* <GameboardHeader /> */}

          <div className="flex flex-col gap-2 mt-8 max-w-[1280px] mx-auto">
            <div className="flex gap-2 items-center">
              <UserBlack className="h-8 w-8" />
              <span>
                {players.length > 1
                  ? isPlayerBlack
                    ? players.find((p) => p.player === 1).userName
                    : players.find((p) => p.player === 2).userName
                  : 'Aguardando jogador...'}
              </span>
            </div>
            <Gameboard
              isWatcher={isWatcher}
              isSecondPlayer={isPlayerBlack}
              players={players}
              onGameEnd={(winMessage) => {
                setIsVictoryModalOpen(true);
                setVictoryMessage(winMessage);
              }}
              socket={socket}
            />
            <div className="flex gap-2 items-center">
              <UserWhite className="h-8 w-8" />
              <span>
                {isPlayerBlack
                  ? localStorage.getItem('userName')
                  : players.find((p) => p.player == 1)?.userName}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionPage;
