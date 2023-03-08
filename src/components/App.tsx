import React, {useState} from "react";
import Board from "./Board";

function App() {
    const [gameStarted, setGameStarted] = useState(false);
    const [level, setLevel] = useState("easy");

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            {gameStarted ? (
                <div className="bg-gray-200 rounded-lg p-4">
                    <h1 className="text-3xl font-bold mb-4">Démineur</h1>
                    <Board level={level}/>
                </div>
            ) : (
                <div className="bg-gray-200 rounded-lg p-4">
                    <h1 className="text-3xl font-bold mb-4">Démineur</h1>
                    <div className="mb-4">
                        <label className="mr-2 font-bold" htmlFor="level">Choisir le niveau:</label>
                        <select
                            name="level"
                            id="level"
                            value={level}
                            onChange={e => setLevel(e.target.value)}
                            className="border border-gray-400 rounded p-1"
                        >
                            <option value="easy">Facile</option>
                            <option value="medium">Moyen</option>
                            <option value="expert">Expert</option>
                            <option value="master">Maître</option>
                        </select>
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => setGameStarted(true)}>Lancer la partie
                    </button>
                </div>
            )}
        </div>
    );

}

export default App;

// create hello word function 