import BoardComponent from "../../components/BoardComponent";
import React, {useEffect, useState} from "react";
import {Link, useSearchParams} from "react-router-dom";
import {Level} from "../../interfaces/level";
import {user} from "../../constants/storage";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";

const GamePage = () => {
    const [searchParams] = useSearchParams();
    const level = searchParams.get("level") ? searchParams.get("level") : Level.EASY;
    const [username, setUsername] = useState<string | null>(null);

    useEffect(() => {
        setUsername(localStorage.getItem(user));
    }, [])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="flex justify-between items-center w-full">
                <Link to="..">
                    <FontAwesomeIcon
                        icon={faArrowLeft}
                        style={{fontSize: 50, color: 'black'}}
                        className="m-10 hover:scale-125 transition-all duration-200 ease-in-out"
                    />
                </Link>
                <h1 className="text-xl font-bold">Bon courage {username}</h1>
                <div className="w-24"></div>
            </div>

            <div className="bg-gray-200 rounded-lg p-4">
                <h1 className="text-3xl font-bold mb-4">Démineur</h1>
                <BoardComponent level={level as Level}/>
            </div>
        </div>
    )
}

export default GamePage;