import BoardComponent from "../../components/BoardComponent";
import React, {useEffect, useState} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import {Level} from "../../interfaces/level";

const GamePage = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const level = searchParams.get("level") ? searchParams.get("level") : Level.EASY;
    const [username, setUsername] = useState<string | null>(null);

    useEffect(() => {
        setUsername(localStorage.getItem("user"));
    }, [])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-xl font-bold mb-4">Bon courage {username}</h1>
            <div className="bg-gray-200 rounded-lg p-4">
                <h1 className="text-3xl font-bold mb-4">Démineur</h1>
                <BoardComponent level={level as Level}/>
            </div>
            <button onClick={() => navigate(-1)}
                    className="mt-4 hover:text-blue-600">
                Revenir en arrière
            </button>
        </div>
    )
}

export default GamePage;