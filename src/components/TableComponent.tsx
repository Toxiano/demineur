import React from 'react'
import {useNavigate} from "react-router-dom";

const TableComponent = () => {
    const navigate = useNavigate();

    return (
        <>
            <p>LALALAL</p>
            <button onClick={() => navigate("/set/game")}>Go to game</button>
        </>
    )
}
export default TableComponent
