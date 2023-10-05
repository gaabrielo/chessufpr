import { useEffect, useRef, useState } from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import { UserGroupIcon } from '@heroicons/react/24/solid';

const ChatBar = ({ socket }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [viewers, setViewers] = useState([]);
  const [typingStatus, setTypingStatus] = useState('');
  const lastMessageRef = useRef(null);

  useEffect(() => {
    socket.on('newUserResponse', (data) => setViewers(data));
  }, [socket, viewers]);

  useEffect(() => {
    socket.on('messageResponse', (data) => setMessages([...messages, data]));
  }, [socket, messages]);

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    socket.on('typingResponse', (data) => setTypingStatus(data));
  }, [socket]);

  const handleTyping = () =>
    socket.emit(
      'typing',
      `${localStorage.getItem('userName')} está escrevendo...`
    );

  const handleLeaveTyping = () => socket.emit('typing', ``);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && localStorage.getItem('userName')) {
      socket.emit('message', {
        text: message,
        name: localStorage.getItem('userName'),
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
      });
    }
    setMessage('');
  };

  return (
    <div className="w-full h-full md:max-w-xs text-left flex-col gap-4 md:border-r border-zinc-700 pt-6 flex">
      <span className="text-gray-100 flex gap-2 items-center max-md:mt-2 px-6">
        <UserGroupIcon className="w-5 h-5" />
        {viewers?.length - 2 < 0 ? 0 : viewers?.length - 2 ?? 0} assistindo
      </span>

      <h2 className="font-semibold px-6">Chat</h2>

      <section className="w-full h-full flex flex-col">
        {/* max-h-[calc(100vh-296px)] */}
        <div className="flex-1 flex flex-col gap-4 px-6 w-full overflow-y-auto max-h-[calc(100vh-296px)]">
          {messages.map((message) =>
            message.name === localStorage.getItem('userName') ? (
              <div className="pl-6" key={message.id}>
                <p className="text-right">You</p>
                <div className="rounded-lg py-2 px-3 bg-orange-700 text-white text-left w-fit ml-auto mr-0 break-all">
                  <p>{message.text}</p>

                  <footer className="w-full text-right mt-2">
                    <span className="text-sm text-zinc-300">{`${new Date(
                      message.timestamp
                    ).getHours()}:${new Date(
                      message.timestamp
                    ).getMinutes()}`}</span>
                  </footer>
                </div>
              </div>
            ) : (
              <div className="pr-6" key={message.id}>
                <p>{message.name}</p>
                <div className="rounded-lg py-2 px-3 bg-gray-700 text-white text-left w-fit ml-0 mr-auto break-all">
                  <p>{message.text}</p>

                  <footer className="w-full text-right mt-2">
                    <span className="text-sm text-zinc-300">{`${new Date(
                      message.timestamp
                    ).getHours()}:${new Date(
                      message.timestamp
                    ).getMinutes()}`}</span>
                  </footer>
                </div>
              </div>
            )
          )}

          <p>{typingStatus}</p>
          <div ref={lastMessageRef}></div>
        </div>

        <div className="flex px-6 pb-6 mt-2">
          <textarea
            type="text"
            minLength={6}
            name="username"
            id="username"
            className="rounded-s-lg p-2 w-full h-16 resize-none placeholder:text-gray-400 text-gray-50"
            placeholder="Digite uma mensagem..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleTyping}
            onBlur={handleLeaveTyping}
          />
          <button
            className="bg-[#3B3B3B] px-4 rounded-e-lg text-gray-400 hover:text-gray-50 transition-all"
            onClick={handleSendMessage}
          >
            <PaperAirplaneIcon className="w-5 h-5" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default ChatBar;
