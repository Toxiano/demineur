import React, {useEffect, useRef, useState} from "react";
import {boardHeights, boardWidths, numBombs} from "../constants/levels";
import {countNeighbors, generateBoard, revealHideBombs, revealZeros} from "../utils/game";
import {Status} from "../interfaces/status";
import TimerComponent from "./TimerComponent";
import {Level} from "../interfaces/level";
import {historyGame} from "../constants/storage";
import {HistoryGame} from "../interfaces/storage";
import Modal from "./Modal";
import {base64ToJson, jsonToBase64} from "../utils/obj";


interface BoardProps {
    level: Level
}

const BoardComponent = ({level}: BoardProps) => {
    const [board, setBoard] = useState<any[][]>(generateBoard(boardWidths[level], boardHeights[level], numBombs[level]));
    const [time, setTime] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [revealBombs, setRevealBombs] = useState(false);
    const [isCheat, setIsCheat] = useState(false);
    const [continueGame, setContinuGame] = useState(false);
    const intervalRef = useRef<any>();
    const textAreaRef = useRef<any>();


    const handleClick = async (x: number, y: number) => {
        if (gameOver) return;
        const cell = board[y][x];
        if (cell && cell.type === Status.BOMB) {
            alert("Vous avez perdu");
            historyOfGame(false);
            setGameOver(true);
            setTime(0);
            setBoard(revealHideBombs(board, true));
            return;
        }
        //optimization éviter de faire inutilement des copies
        if (!cell) {
            const updatedBoard = [...board];
            updatedBoard[y][x] = {
                type: Status.EMPTY,
                revealed: true,
                count: countNeighbors(x, y, board)
            };
            setBoard(updatedBoard);
            if (updatedBoard[y][x].count === 0) {
                setBoard(await revealZeros(x, y, updatedBoard));
            }
        } else if (!cell.revealed) {
            const updatedCell = {...cell, revealed: true};
            setBoard(prevBoard => {
                const updatedRow = [...prevBoard[y]];
                updatedRow[x] = updatedCell;
                const updatedBoard = [...prevBoard];
                updatedBoard[y] = updatedRow;
                return updatedBoard;
            });
            if (cell.count === 0) {
                setBoard(await revealZeros(x, y, board));
            }
        }
    };

    const handleFlag = (x: number, y: number) => {
        const cpBoard = [...board]
        if (cpBoard[y][x] && cpBoard[y][x].flag) {
            if (cpBoard[y][x].bomb) {
                cpBoard[y][x] = {
                    revealed: false,
                    type: Status.BOMB,
                }
                setBoard(cpBoard);
                return
            }
            cpBoard[y][x] = null
            setBoard(cpBoard);
            return
        }
        if (cpBoard[y][x] && cpBoard[y][x].type === Status.BOMB) {
            cpBoard[y][x] = {
                ...cpBoard[y][x],
                flag: true,
                bomb: true
            };
            setBoard(cpBoard);
            return
        }
        cpBoard[y][x] = {
            ...cpBoard[y][x],
            flag: true
        }
    }

    const historyOfGame = (isWin: boolean) => {
        const history = JSON.parse(localStorage.getItem(historyGame) as string) as HistoryGame[];
        history.push({time, level, cheat: isCheat, win: isWin});
        localStorage.setItem(historyGame, JSON.stringify(history));
    }

    const resetBoard = () => {
        setBoard(generateBoard(boardWidths[level], boardHeights[level], numBombs[level]));
        setTime(0);
        setGameOver(false);
    };

    useEffect(() => {
        const handleContextMenu = (e: any) => e.preventDefault()
        document.addEventListener("contextmenu", handleContextMenu)
        return () => {
            document.removeEventListener("contextmenu", handleContextMenu)
        }
    }, [])

    useEffect(() => {
        if (!gameOver) {
            intervalRef.current = setInterval(() => {
                setTime(time => time + 1);
            }, 1000);
        }
        return () => clearInterval(intervalRef.current);
    }, [gameOver]);

    useEffect(() => {
        if (!gameOver) {
            let winCount = 0
            for (let i = 0; i < board.length; i++) {
                for (let j = 0; j < board[0].length; j++) {
                    if (board[i][j] && board[i][j].type !== Status.BOMB && board[i][j].revealed) {
                        winCount++;
                    }
                }
            }
            if (winCount === boardWidths[level] * boardHeights[level] - numBombs[level]) {
                alert("Vous avez gagné!");
                historyOfGame(true);
                clearInterval(intervalRef.current);
            }
        }
        // eslint-disable-next-line
    }, [board, gameOver]);

    return (
        <div className="bg-gray-100 rounded-lg p-4">
            {
                continueGame &&
                <Modal
                    title={"Poursuivre le jeu plus tard, sauvegarder le code pour continuer le jeu"}
                    body={
                        <div className="w-full">
                            <textarea className="w-full h-64" defaultValue={jsonToBase64(board)} ref={textAreaRef}/>
                        </div>

                    }
                    footer={
                        <>
                            <button className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                                    onClick={() => setContinuGame(false)}>
                                Fermer
                            </button>
                            <button
                                className=" mr-3 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                onClick={() => {
                                    setBoard(base64ToJson(textAreaRef.current.value))
                                    setContinuGame(false)
                                }}>
                                Continuer
                            </button>
                        </>
                    }
                />
            }
            <div className="flex justify-center items-center">
                <div className="space-x-4">
                    <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                            onClick={resetBoard}>
                        Recommencer
                    </button>
                    {
                        !revealBombs ?
                            <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                    onClick={() => {
                                        setBoard(revealHideBombs(board, true));
                                        setIsCheat(true);
                                        setRevealBombs(true);
                                    }}>Tricher
                            </button> :
                            <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                    onClick={() => {
                                        setBoard(revealHideBombs(board, false));
                                        setRevealBombs(false);
                                    }}>Pas tricher
                            </button>
                    }
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => setContinuGame(true)}>
                        Poursuivre le jeu
                    </button>
                </div>
            </div>
            <div className="mb-4">
                <TimerComponent time={time}/>
            </div>
            <div className="flex justify-center">
                <table>
                    <tbody>
                    {board.map((row, y) => (
                        <tr key={y}>
                            {row.map((cell, x) => (
                                <td key={x}>
                                    <button
                                        className={`bg-gray-200 hover:bg-gray-300 rounded text-white font-bold transition-colors duration-1000 ease-in-out ${cell && cell.revealed ? (cell.type === Status.BOMB ? 'bg-red-600' : 'bg-gray-400 cell-revealed') : ''}`}
                                        style={{width: '25px', height: '25px'}}
                                        onContextMenu={() => handleFlag(x, y)}
                                        onClick={() => handleClick(x, y)}
                                        disabled={(cell && cell.revealed) || cell?.flag}
                                    >
                                        {cell?.flag ? "⛳️" : null}
                                        {cell && cell.revealed ? (
                                            cell.type === Status.BOMB ? !cell?.flag ? "💣" : null : !cell?.flag ? cell.count : null
                                        ) : null}
                                    </button>
                                </td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

};


export default BoardComponent;