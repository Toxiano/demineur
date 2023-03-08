import React, {useContext, useEffect, useRef, useState} from "react";
import {boardHeights, boardWidths, numBombs} from "../constants/levels";
import {countNeighbors, generateBoard, revealBombs, revealZeros} from "../utils/game";
import {Status} from "../interfaces/status";
import TimerComponent from "./TimerComponent";
import {GameContext} from "../HOC/game";


interface BoardProps {
    level: string;
}

const BoardComponent = ({level}: BoardProps) => {
    const {test} = useContext(GameContext)

    const [board, setBoard] = useState(generateBoard(boardWidths[level], boardHeights[level], numBombs[level]));
    const [time, setTime] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [isWin, setIsWin] = useState(false);
    const intervalRef = useRef<any>();

    const handleClick = (x: any, y: any) => {
        if (gameOver) return;
        if (board[y][x] && board[y][x].type === Status.BOMB) {
            alert("SettingsComponent Over");
            setGameOver(true);
            setBoard(revealBombs(board));
        } else {
            const updatedBoard = [...board];
            // console.log(numBombs[level])

            // board.forEach(array => array.forEach(e => {
            //   console.log(e);
            //   if(e !== null) setIsWin(true)
            // }))


            if (!board[y][x]) {
                updatedBoard[y][x] = {type: Status.EMPTY, revealed: true, count: countNeighbors(x, y, board)};
            } else {
                updatedBoard[y][x].revealed = true;
            }
            setBoard(updatedBoard);
            if (board[y][x] && board[y][x].count === 0) {
                setBoard(revealZeros(x, y, board))
            }
        }
    };


    const boardWidth = boardWidths[level] * 25

    const resetBoard = () => {
        setBoard(generateBoard(boardWidths[level], boardHeights[level], numBombs[level]));
        setTime(0);
        setGameOver(false);
        setIsWin(false);
        clearInterval(intervalRef.current);
    };

    useEffect(() => {
        if (!gameOver) {
            for (let i = 0; i < board.length; i++) {
                for (let j = 0; j < board[0].length; j++) {
                    if (board[i][j] && board[i][j].type !== Status.BOMB && !board[i][j].revealed) {
                        console.log(board);
                        setIsWin(true)
                    }
                }
            }
            if (isWin) {
                alert("Vous avez gagné!");
                clearInterval(intervalRef.current);
            }
        }

        if (!gameOver) {
            intervalRef.current = setInterval(() => {
                setTime(time => time + 1);
            }, 1000);
        }
        return () => {
            clearInterval(intervalRef.current);
        };
    }, [board, gameOver, isWin]);

    return (
        <div className="bg-gray-100 rounded-lg p-4">
            <div className="flex justify-center items-center">
                <div className="space-x-4">
                    <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                            onClick={resetBoard}>
                        Recommencer
                    </button>
                    <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => {
                                setBoard(revealBombs(board))
                            }}>Tricher
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
                                        className={`${
                                            cell && cell.revealed
                                                ? cell.type === Status.BOMB
                                                    ? "bg-red-600"
                                                    : "bg-gray-400"
                                                : "bg-gray-200 hover:bg-gray-300"
                                        } text-white font-bold rounded`}
                                        style={{width: '25px', height: '25px'}}
                                        onClick={() => handleClick(x, y)}
                                        disabled={cell && cell.revealed}
                                    >
                                        {cell && cell.revealed ? (
                                            cell.type === Status.BOMB ? "💣" : cell.count
                                        ) : ""}
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