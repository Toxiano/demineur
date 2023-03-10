import React, {useEffect, useState} from 'react'
import {Link, useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import TableComponent from "../../components/TableComponent";
import {HistoryGame, RankingGame} from "../../interfaces/storage";
import {historyGame, user} from "../../constants/storage";
import {Level} from "../../interfaces/level";

const RankingPage = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState<string | null>(null);
    const [ranking, setRanking] = useState<RankingGame[] | []>([]);
    const [isHistory, setIsHistory] = useState(false);
    const [level, setLevel] = useState<Level>(Level.EASY);

    const displayRanking = (historic: HistoryGame[]) => {
        const ranking = historic.filter((game: HistoryGame) => game.level === level);
        ranking.sort((a: HistoryGame, b: HistoryGame) => {
            if (a.win && !b.win) {
                return -1;
            }
            if (!a.win && b.win) {
                return 1;
            }
            if (a.time < b.time) {
                return -1;
            }
            if (a.time > b.time) {
                return 1;
            }
            return 0;
        })
        setRanking(ranking);
    }

    useEffect(() => {
        const historic = JSON.parse(localStorage.getItem(historyGame) as string).reverse() as HistoryGame[];
        setUsername(localStorage.getItem(user));
        setIsHistory(historic.length > 0);
        displayRanking(historic)
        // eslint-disable-next-line
    }, [level])
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
                <h1 className="text-2xl font-bold mb-4 text-center">Salut {username}, ça c'est ton ranking de
                    jeu
                </h1>
                <div>
                    <button
                        onClick={() => navigate("/set/game")}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Jouer
                    </button>
                </div>
            </div>
            {
                isHistory ? (
                    <>
                        <p className="text-center mb-5">Pour voir le classement d'un niveau, clique sur le bouton
                            correspondant</p>
                        <div className="flex justify-center gap-2">
                            <button
                                onClick={() => setLevel(Level.EASY)}
                                className={`${level === Level.EASY ? 'bg-blue-700' : 'bg-blue-300'} hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`}>
                                {Level.EASY}
                            </button>
                            <button
                                onClick={() => setLevel(Level.MEDIUM)}
                                className={`${level === Level.MEDIUM ? 'bg-blue-700' : 'bg-blue-300'} hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`}>
                                {Level.MEDIUM}
                            </button>
                            <button
                                onClick={() => setLevel(Level.EXPERT)}
                                className={`${level === Level.EXPERT ? 'bg-blue-700' : 'bg-blue-300'} hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`}>
                                {Level.EXPERT}
                            </button>
                            <button
                                onClick={() => setLevel(Level.MASTER)}
                                className={`${level === Level.MASTER ? 'bg-blue-700' : 'bg-blue-300'} hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`}>
                                {Level.MASTER}
                            </button>
                        </div>
                        {
                            ranking.length > 0 ? <TableComponent data={ranking}/> :
                                <p className="text-center m-10">Désolé, tu n'as pas encore joué à ce niveau</p>
                        }
                    </>
                ) : (
                    <div>
                        <p className="text-center mb-5">Tu n'as pas encore joué, clique sur le bouton pour jouer</p>
                    </div>
                )
            }
        </>
    )
}

export default RankingPage