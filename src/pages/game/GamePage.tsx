import BoardComponent from "../../components/BoardComponent";
import React from "react";

const GamePage = () => {

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-gray-200 rounded-lg p-4">
                <h1 className="text-3xl font-bold mb-4">Démineur</h1>
                {/*todo change url*/}
                <BoardComponent level={"easy"}/>
            </div>
        </div>

    )
}

export default GamePage;