import React from "react";
import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import SetGame from "./pages/game/SetGamePage";
import {GameProvider} from "./HOC/GameContext";
import GamePage from "./pages/game/GamePage";
import IdentifyPage from "./pages/Auth/IdentifyPage";
import DashboardPage from "./pages/home/DashboardPage";
import HistoryPage from "./pages/home/HistoryPage";
import RankingPage from "./pages/home/RankingPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <DashboardPage/>,
    },
    {
        path: "/history",
        element: <HistoryPage/>,
    },
    {
        path: "/ranking",
        element: <RankingPage/>,
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