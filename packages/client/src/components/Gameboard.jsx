import { useEffect, useState } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';

const Gameboard = ({
  isWatcher,
  isSecondPlayer,
  players,
  socket,
  // started = false,
  onGameEnd,
  ...rest
}) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  // const [started, setStarted] = useState(false);
  const [game, setGame] = useState(null);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  useEffect(() => {
    socket.on('gameStartedResponse', (gameStatus) => {
      // Nova instância do jogo
      if (gameStatus) {
        setGame(new Chess());
      } else {
        if (game) {
          onGameEnd({
            result: 'VENCEDOR',
            message:
              (game.turn() === 'w' ? 'Preto' : 'Branco') + ' venceu por W.O.',
          });
          game.reset();
        }

        setGame(null);
      }
    });

    if (!game) return;

    socket.on('pieceMovedResponse', (move) => {
      // Nova instância do jogo
      const newGame = new Chess();
      newGame.load(move);
      setGame(newGame);
    });

    // fim de jogo
    if (game.game_over()) {
      let result, message;

      if (game.in_checkmate()) {
        // terminou em xeque-mate
        message = game.turn() === 'w' ? 'Preto' : 'Branco';
        result = 'VENCEDOR';
      } else if (game.in_stalemate()) {
        // terminou em empate por afogamento
        message = 'Empate por afogamento';
        result = 'EMPATE';
      } else if (game.in_draw()) {
        // terminou em empate
        message = 'Fim de partida';
        result = 'EMPATE';
      } else if (game.in_threefold_repetition()) {
        // terminou por repetição de movimentos
        message = 'Empate por repetição de movimentos';
        result = 'EMPATE';
      }

      onGameEnd({ result, message });
      game.reset();
    }
  }, [socket, game]);

  useEffect(() => {
    if (game && players?.length < 2) {
      // game.reset();
      // setGame(null);
      socket.emit('gameStarted', false);
    }
  }, [players, game, socket]);

  function makeAMove(move) {
    const gameCopy = { ...game };
    const result = gameCopy.move(move);
    setGame(gameCopy);
    return result; // null se o movimento for ilegal
  }

  function onDrop(sourceSquare, targetSquare) {
    // se nao for a vez do jogador, cancela o movimento
    if (game.turn() !== (isSecondPlayer && !isWatcher ? 'b' : 'w')) {
      return false;
    }

    const move = makeAMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q', // sempre promove à rainha
    });

    // movimento ilegal
    if (move === null) return false;

    socket.emit('pieceMoved', game.fen());
    return true;
  }

  function startGame() {
    if (players?.length === 2) {
      socket.emit('gameStarted', true);
      setGame(new Chess());
    }
  }

  if (!game) {
    return (
      <div className="relative">
        <div
          className={`absolute top-0 right-0 z-10 w-full h-full bg-black/50 flex items-center justify-center`}
        >
          <button
            onClick={startGame}
            disabled={players?.length < 2}
            className="bg-orange-600 h-full max-h-16 w-full max-w-xs transition-all text-white font-semibold hover:brightness-95 border-orange-700 border-b-4 px-2 py-2 hover:border-b-4 hover:border-b-orange-700 rounded-lg flex flex-col justify-center items-center leading-5"
          >
            <span>Iniciar partida</span>

            <span className="font-normal">
              {players?.length < 2 ? 'Aguardando jogadores...' : ''}
            </span>
          </button>
        </div>
        <Chessboard
          id="Board"
          boardWidth={windowWidth >= 500 ? 500 : windowWidth}
          arePiecesDraggable={false}
        />
      </div>
    );
  }

  return (
    <Chessboard
      id="Board"
      boardWidth={windowWidth >= 500 ? 500 : windowWidth}
      position={game ? game.fen() : null}
      onPieceDrop={onDrop}
      boardOrientation={isSecondPlayer ? 'black' : 'white'}
      arePiecesDraggable={!isWatcher}
      // {...rest}
    />
  );
};

export default Gameboard;
