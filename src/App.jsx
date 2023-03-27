import { useState } from 'react';
import Board from './Components/Board.jsx';
import './style.scss';
import { calculateWinner } from './winner.js';

function App() {
  const [squares, setsquares] = useState(Array(9).fill(null));
  const [isXnext, setIsXNext] = useState(false);

  const winner = calculateWinner(squares);
  const nextPlayer = isXnext ? 'x' : '0';
  const statusMessage = winner
    ? `Winner is ${winner}`
    : `Next Player is ${nextPlayer}`;

  const handleSquareClick = clickedPosition => {
    if (squares[clickedPosition] || winner) {
      return;
    }
    setsquares(currentSquares => {
      return currentSquares.map((squareValue, position) => {
        if (clickedPosition == position) {
          return isXnext ? 'X' : '0';
        }

        return squareValue;
      });
    });
    setIsXNext(currentIsXnext => !currentIsXnext);
  };

  return (
    <div className="app">
      <h2>{statusMessage}</h2>
      <Board squares={squares} handleSquareClick={handleSquareClick} />
    </div>
  );
}

export default App;
