import React, { useState } from 'react';
import './App.css';
import { Square } from './components/Square';
import { turns} from './constantes';
import { checkWinnerfrom, checkEndgame} from './logic/board';
import { WinnerModal } from './components/winnerModal';

function App() {
  const [board, setBoard] = useState(() => {
    const boardFromstorage = window.localStorage.getItem('board')
    if (boardFromstorage) return JSON.parse(boardFromstorage) 
    return Array(9).fill(null)
  });
  
  const [turn, setTurn] = useState(() =>{
    const turnFormstorage = window.localStorage.getItem('turn')
    turns.X
  })
  const [winner, setWinner] = useState(null)

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(turns.X)
    setWinner(null)
    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
  }

  const updateBoard = (index) => {
    if (board[index] || winner) return
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    
    const newTurn = turn === turns.X ? turns.O : turns.X
    setTurn(newTurn)
    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn', newTurn)
    const newWinner = checkWinnerfrom(newBoard)
    if (newWinner) {
      setWinner(newWinner)
    } else if (checkEndgame(newBoard)) {
      setWinner(false)
    }
  }
  return (
    <>
      <main className='board'>
        <h1>Tic Tac Toe</h1>
        <button onClick={resetGame}>Reset game</button>
        <section className='game'>
          {board.map((square, index) => (
              <Square 
                key={index} 
                index={index}
                updateBoard={updateBoard}
              >
                {square}
              </Square>
          ))}
        </section>
        <section className='turn'>
          <Square isSelected={turn === turns.X}>
            {turns.X}
          </Square>
          <Square isSelected={turn === turns.O}>
            {turns.O}
          </Square>
        </section>
        <WinnerModal resetGame={resetGame} winner={winner} /> 
      </main>
    </>
  );
}

export default App;

