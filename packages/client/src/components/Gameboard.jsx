import { useEffect, useState } from 'react';
import { Chessboard } from 'react-chessboard';

const Gameboard = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  return (
    <div>
      <Chessboard
        id="Board"
        boardWidth={windowWidth >= 500 ? 500 : windowWidth}
      />
    </div>
  );
};

export default Gameboard;
