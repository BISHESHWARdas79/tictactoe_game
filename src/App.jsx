import './style.scss';
import Board from './Components/Board.jsx';
import History from './Components/History.jsx';
import StatusMessage from './Components/statusMessage.jsx';
import { useState } from 'react';
import { calculateWinner } from './winner.js';

const NEW_GAME = [{ squares: Array(9).fill(null), isXnext: false }];

function App() {
  const [history, setHistory] = useState(NEW_GAME);
  const [currentMove, setCurrentMove] = useState(0);

  const gamingBoard = history[currentMove];

  const { winner, winningSquares } = calculateWinner(gamingBoard.squares);

  const handleSquareClick = clickedPosition => {
    if (gamingBoard.squares[clickedPosition] || winner) {
      return;
    }

    setHistory(currentHistory => {
      const isTraversinng = currentMove + 1 !== currentHistory.length;

      const lastGamingState = isTraversinng
        ? currentHistory[currentMove]
        : currentHistory[currentHistory.length - 1];

      const nextSquareState = lastGamingState.squares.map(
        (squareValue, position) => {
          if (clickedPosition == position) {
            return lastGamingState.isXnext ? 'X' : '0';
          }

          return squareValue;
        }
      );

      const base = isTraversinng
        ? currentHistory.slice(0, currentHistory.indexOf(lastGamingState) + 1)
        : currentHistory;

      return base.concat({
        squares: nextSquareState,
        isXnext: !lastGamingState.isXnext,
      });
    });

    setCurrentMove(move => move + 1);
  };

  const moveTo = move => {
    setCurrentMove(move);
  };

  const onNewGAme = () => {
    setHistory(NEW_GAME);
    setCurrentMove(0);
  };

  return (
    <div className="app">
      <StatusMessage winner={winner} gamingBoard={gamingBoard} />
      <Board
        squares={gamingBoard.squares}
        handleSquareClick={handleSquareClick}
        winningSquares={winningSquares}
      />
      <button
        className={`btn-reset ${winner ? 'active' : ''}`}
        type="button"
        onClick={onNewGAme}
      >
        START NEW GAME
      </button>
      <h2>Current Game History</h2>
      <History history={history} moveTo={moveTo} currentMove={currentMove} />
    </div>
  );
}

export default App;
