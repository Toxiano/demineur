import React from "react";
import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import Home from "./pages/home/HomePage";
import SetGame from "./pages/game/SetGamePage";
import {GameProvider} from "./HOC/game";
import GamePage from "./pages/game/GamePage";

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