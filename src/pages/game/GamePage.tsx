import BoardComponent from "../../components/BoardComponent";
import React, {useEffect} from "react";
import {useSearchParams} from "react-router-dom";

const GamePage = () => {
    const [searchParams] = useSearchParams();
    const level = searchParams.get("level") ? searchParams.get("level") : "easy";


    useEffect(() => {

    }, [searchParams]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-gray-200 rounded-lg p-4">
                <h1 className="text-3xl font-bold mb-4">Démineur</h1>
                <BoardComponent level={level as string}/>
            </div>
        </div>

    )
}

export default GamePage;