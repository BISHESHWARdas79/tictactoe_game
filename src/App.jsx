import { useState } from 'react';
import Board from './Components/Board.jsx';
import './style.scss';

function App() {
  const [counter, setCounter] = useState(1);

  const onBtnClick = () => {
    // setCounter(counter + 1);
    setCounter(currentCounter => {
      return currentCounter + 1;
    });
  };
  return (
    <div className="app">
      <div>
        <button onClick={onBtnClick}>CLick me Please</button>
        <div>{counter}</div>
      </div>
    </div>
  );
}

export default App;
