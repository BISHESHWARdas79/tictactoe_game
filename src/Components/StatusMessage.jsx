const StatusMessage = ({ winner, isXnext, squares }) => {
  const noMovesLeft = squares.every(squareValue => squareValue != null);
  const nextPlayer = isXnext ? 'x' : '0';

  const renderStautsMesage = () => {
    if (winner) {
      return (
        <>
          Winner is{' '}
          <span className={winner === 'X' ? 'text-green' : 'text-orange'}>
            {winner}
          </span>
        </>
      );
    }
    if (!winner && noMovesLeft) {
      return (
        <>
          <span className="text-orange">0</span> and{' '}
          <span className="text-green">X</span> tied
        </>
      );
    }
    if (!winner && !noMovesLeft) {
      return (
        <>
          Next Player is{' '}
          <span className={isXnext ? 'text-green' : 'text-orange'}>
            {nextPlayer}
          </span>
        </>
      );
    }
    return null;
  };
  return <div className="status-message">{renderStautsMesage()}</div>;
};

export default StatusMessage;
