import React from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGamepad, faHistory, faRankingStar} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";

const DashboardPage = () => {
    return (
        <>
            <div>
                <h1 className="text-center text-3xl mt-20">
                    Bienvenue dans le dashboard
                </h1>
            </div>
            <div className="flex justify-center mt-32">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-14 mb-10">
                    <Link
                        to="/history"
                        className={`w-52 rounded-[30px] p-6 bg-gray-300 hover:bg-gray-400 flex flex-col justify-center align-middle items-center`}
                    >
                        <FontAwesomeIcon
                            icon={faHistory}
                            style={{fontSize: 100, color: 'white'}}
                            className="mb-4"
                        />
                        <p className="text-white text-lg">Historique</p>
                    </Link>
                    <Link
                        to="/ranking"
                        className={`w-52 rounded-[30px] p-6 bg-gray-300 hover:bg-gray-400 flex flex-col justify-center align-middle items-center`}
                    >
                        <FontAwesomeIcon
                            icon={faRankingStar}
                            style={{fontSize: 100, color: 'white'}}
                            className="mb-4"
                        />
                        <p className="text-white text-lg">Ranking</p>
                    </Link>
                    <Link
                        to="/set/game"
                        className={`w-52 rounded-[30px] p-6 bg-gray-300 hover:bg-gray-400 flex flex-col justify-center align-middle items-center`}
                    >
                        <FontAwesomeIcon
                            icon={faGamepad}
                            style={{fontSize: 100, color: 'white'}}
                            className="mb-4"
                        />
                        <p className="text-white text-lg">Jouer</p>
                    </Link>
                </div>
            </div>
        </>
    )

}

export default DashboardPage