import React from "react";
import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import Home from "./pages/home/HomePage";
import SetGame from "./pages/game/SetGamePage";
import {GameProvider} from "./HOC/GameContext";
import GamePage from "./pages/game/GamePage";
import IdentifyPage from "./pages/Auth/IdentifyPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home/>,
    },
    {
        path: "/set/game",
        element: <SetGame/>,
    },
    {
        path: "/game",
        element: <GamePage/>,
    },
    {
        path: "/identify",
        element: <IdentifyPage/>,
    }
]);

const App = () => {
    return (
        <GameProvider>
            <RouterProvider router={router}/>
        </GameProvider>
    );
}

export default App;