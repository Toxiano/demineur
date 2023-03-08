import React, {createContext, useEffect} from 'react';
import {IGameContext} from "../interfaces/context";
import {historyGame, user} from "../constants/storage";


export const GameContext = createContext<IGameContext>({} as IGameContext);
export const GameProvider = ({children}: { children: React.ReactNode }) => {

    useEffect(() => {
        checkUserNotExist()
    }, []);

    const checkUserNotExist = () => {
        if (!localStorage.getItem(user) && !window.location.href.includes('/identify')) {
            window.location.href = '/identify'
        }
        if (localStorage.getItem(user) && window.location.href.includes('/identify')) {
            window.location.href = '/'
        }
    }

    const createUsername = (username: string) => {
        localStorage.setItem(user, username)
        localStorage.setItem(historyGame, JSON.stringify([]))
        window.location.href = '/'
    }

    return (
        <GameContext.Provider value={{createUsername}}>
            {children}
        </GameContext.Provider>
    );
}
