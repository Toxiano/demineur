import React, {createContext} from 'react';


export const GameContext = createContext<{ test: string }>({test: "test"});
export const GameProvider = ({children}: any) => {
    const test = "test"
    return (
        <GameContext.Provider value={{test}}>
            {children}
        </GameContext.Provider>
    );
}
