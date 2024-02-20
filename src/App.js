import { useState } from 'react';


function Square({ value, onSquareClick }) {
  return <button className="square" onClick={onSquareClick}>{value}</button>;
};

function Board({squares, xIsNext, onPlay,ResetGame}) {
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice(); 
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  };

  const winner = calculateWinner(squares);
  const isDraw = (element) => element === null;
  let status;
  
  if (winner) {
    status = "Winner: " + winner;
  } else if (!(squares.some(isDraw))) {
    status = "Draw"
  } else {
    status = 'Next player:' + (xIsNext ? "X" : "O");
  };
  
  const renderSquare = (i) => (
    <Square key={i} value={squares[i]} onSquareClick={() => handleClick(i)} />
  );

  const renderBoardRow = (startIdx) => (
    <div className="board-row" key={startIdx}>
      {[0, 1, 2].map((col) => renderSquare(startIdx + col))}
    </div>
  );

  const boardRows = [0, 3, 6].map((rowStart) => renderBoardRow(rowStart));

  return (
    <>
      <div className="status"><p>{status}</p></div>
      {boardRows}
      <div> 
        <button className='resetButton' onClick={ResetGame}>New Game</button>
      </div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];
  let xIsNext = currentMove % 2 === 0; 

  function handlePlay (nextSquares){
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function ResetGame() {
     setCurrentMove(0);
     setHistory([Array(9).fill(null)]);
  };

  function jumpTo(nextMove){
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) =>{
    let description;
    if (move > 0){
      description = 'Vai alla mossa  ' + move;
    } else {
      description = 'Inizio partita'
    }
    
    if(move === currentMove){
      return <li key={move} > {description} </li>
    }
   
    return (
    <li key={move}>
      <button onClick={() => jumpTo(move)}>
       {description}
      </button>
    </li>
   )
  })
 
  return (
    <div className="game">
      <div className="game-board">
        <Board squares={currentSquares} xIsNext={xIsNext} onPlay={handlePlay} ResetGame={ResetGame}/>
      </div>
      <div className="game-info">
        <p>Storia della partita</p>
        <ol>{moves}</ol>
      </div>
    </div>)
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null;
}
