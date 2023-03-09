import React, {useEffect, useState} from "react";
import TableComponent from "../../components/TableComponent";
import {useNavigate} from "react-router-dom";
import {historyGame, user} from "../../constants/storage";
import {HistoryGame} from "../../interfaces/storage";


const Home = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState<string | null>(null);
    const [historic, setHistoric] = useState<HistoryGame[] | []>([]);

    useEffect(() => {
        setUsername(localStorage.getItem(user));
        setHistoric(JSON.parse(localStorage.getItem(historyGame) as string).reverse() as HistoryGame[]);
    }, [])

    return (
        <>
            <div className="flex justify-between items-center m-10">
                <div></div>
                <h1 className="text-2xl font-bold mb-4 text-center">Salut {username}, ça c'est ton historique de
                    jeu</h1>
                <div>
                    <button
                        onClick={() => navigate("/set/game")}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Jouer
                    </button>
                </div>
            </div>
            {historic.length > 0 ? <TableComponent data={historic}/> : null}
        </>
    )
}

export default Home