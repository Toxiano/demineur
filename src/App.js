import React, { useState } from "react";
import Board from "./Board";

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [level, setLevel] = useState("easy");
  
  const startGame = () => {
    setGameStarted(true);
  };
  
  return (
    <div className="App">
      {gameStarted ? (
        <>
          <Board level={level} />
        </>
      ) : (
        <div>
          <h1>Démineur</h1>
          <div>
            <label htmlFor="level">Choisir le niveau</label>
            <select
              name="level"
              id="level"
              value={level}
              onChange={e => setLevel(e.target.value)}
            >
              <option value="easy">Facile</option>
              <option value="medium">Moyen</option>
              <option value="expert">Expert</option>
              <option value="master">Maître</option>
            </select>
          </div>
          <button onClick={startGame}>Lancer la partie</button>
        </div>
      )}
    </div>
  );
}

export default App;

// create hello word function 