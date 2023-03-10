import React, {useEffect, useState} from "react";
import TableComponent from "../../components/TableComponent";
import {Link, useNavigate} from "react-router-dom";
import {historyGame, user} from "../../constants/storage";
import {HistoryGame} from "../../interfaces/storage";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";


const HistoryPage = () => {
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
                <Link to="..">
                    <FontAwesomeIcon
                        icon={faArrowLeft}
                        style={{fontSize: 50, color: 'black'}}
                        className="m-10 hover:scale-125 transition-all duration-200 ease-in-out"
                    />
                </Link>
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
            <TableComponent data={historic}/>
        </>
    )
}

export default HistoryPage;