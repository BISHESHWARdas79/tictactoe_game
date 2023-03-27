import './style.scss';
import Board from './Components/Board.jsx';
import History from './Components/History.jsx';
import StatusMessage from './Components/statusMessage.jsx';
import { useState } from 'react';
import { calculateWinner } from './winner.js';

function App() {
  const [history, setHistory] = useState([
    { squares: Array(9).fill(null), isXnext: false },
  ]);
  // const [squares, setsquares] = useState(Array(9).fill(null));
  // const [isXnext, setIsXNext] = useState(false);
  const [currentMove, setCurrentMove] = useState(0);

  const gamingBoard = history[currentMove];
  const winner = calculateWinner(gamingBoard.squares);

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
      return currentHistory.concat({
        squares: nextSquareState,
        isXnext: !lastGamingState.isXnext,
      });
    });

    setCurrentMove(move => move + 1);
  };

  const moveTo = move => {
    setCurrentMove(move);
  };

  return (
    <div className="app">
      <StatusMessage winner={winner} gamingBoard={gamingBoard} />
      <Board
        squares={gamingBoard.squares}
        handleSquareClick={handleSquareClick}
      />
      <h2>Current Game History</h2>
      <History history={history} moveTo={moveTo} currentMove={currentMove} />
    </div>
  );
}

export default App;
