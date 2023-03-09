import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import SettingsComponent from "../../components/SettingsComponent";
import {user} from "../../constants/storage";

const SetGame = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState<string | null>(null);

    useEffect(() => {
        setUsername(localStorage.getItem(user));
    }, [])

    return (
        <div className="flex justify-center items-center h-screen">
            <div>
                <h1 className="text-2xl font-bold mb-4">Salut {username}, tu dois choisir un niveau de difficulté</h1>

                <SettingsComponent/>
                <button onClick={() => navigate('/')}
                        className="mt-4 w-full hover:text-blue-600">
                    Revenir au menu
                </button>
            </div>
        </div>
    )
}

export default SetGame