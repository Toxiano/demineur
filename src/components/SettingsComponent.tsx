import React, {SetStateAction, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Level} from "../interfaces/level";

const SettingsComponent = () => {
    const navigate = useNavigate();
    const [level, setLevel] = useState(Level.EASY);

    return (
        <div>
            <div className="bg-gray-200 rounded-lg p-4">
                <div className="mb-4 flex justify-center">
                    <label className="mr-2 font-bold" htmlFor="level">Choisir le niveau:</label>
                    <select
                        name="level"
                        id="level"
                        value={level}
                        onChange={e => setLevel(e.target.value as SetStateAction<Level>)}
                        className="border border-gray-400 rounded p-1"
                    >
                        <option value={Level.EASY}>Facile</option>
                        <option value={Level.MEDIUM}>Moyen</option>
                        <option value={Level.EXPERT}>Expert</option>
                        <option value={Level.MASTER}>Maître</option>
                    </select>
                </div>
                <div className="flex justify-center">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => navigate('/game?level=' + level)}>Lancer la partie
                    </button>
                </div>
            </div>
        </div>
    );

}

export default SettingsComponent;