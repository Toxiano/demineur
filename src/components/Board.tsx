import React, {useEffect, useRef, useState} from "react";
import Timer from './Timer';

const boardWidths: any = {
    easy: 9,
    medium: 16,
    expert: 22,
    master: 30
};

const boardHeights: any = {
    easy: 9,
    medium: 16,
    expert: 22,
    master: 30
};

const numBombs: any = {
    easy: 10,
    medium: 40,
    expert: 99,
    master: 200
};

const generateBoard = (width: any, height: any, numBombs: any) => {
    const board = Array(height)
        .fill(null)
        .map(() => Array(width).fill(null));

    let bombsPlaced = 0;
    while (bombsPlaced < numBombs) {
        const x = Math.floor(Math.random() * width);
        const y = Math.floor(Math.random() * height);

        if (!board[y][x]) {
            board[y][x] = {type: "bomb", revealed: false};
            bombsPlaced++;
        }
    }

    return board;
};

const Board = ({level}: any) => {
    const [board, setBoard] = useState(generateBoard(boardWidths[level], boardHeights[level], numBombs[level]));
    const [time, setTime] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [isWin, setIsWin] = useState(false);
    const intervalRef = useRef();

    const handleClick = (x: any, y: any) => {
        if (gameOver) return;
        if (board[y][x] && board[y][x].type === "bomb") {
            alert("Game Over");
            setGameOver(true);
            revealBombs();
        } else {
            const updatedBoard = [...board];
            // console.log(numBombs[level])

            // board.forEach(array => array.forEach(e => {
            //   console.log(e);
            //   if(e !== null) setIsWin(true)
            // }))


            if (!board[y][x]) {
                updatedBoard[y][x] = {type: "empty", revealed: true, count: countNeighbors(x, y)};
            } else {
                updatedBoard[y][x].revealed = true;
            }
            setBoard(updatedBoard);
            if (board[y][x] && board[y][x].count === 0) {
                revealZeros(x, y);
            }
        }
    };

    const countNeighbors = (x: any, y: any) => {
        let neighbors = 0;
        for (let i = Math.max(0, y - 1); i <= Math.min(board.length - 1, y + 1); i++) {
            for (let j = Math.max(0, x - 1); j <= Math.min(board[0].length - 1, x + 1); j++) {
                if (board[i][j] && board[i][j].type === "bomb") neighbors++;
            }
        }
        return neighbors;
    };

    const revealBombs = () => {
        const updatedBoard = [...board];
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[0].length; j++) {
                if (board[i][j] && board[i][j].type === "bomb") {
                    updatedBoard[i][j].revealed = true;
                }
            }
        }
        setBoard(updatedBoard);
    };

    const revealZeros = (x: any, y: any) => {
        let updatedBoard = [...board];
        for (let i = Math.max(0, y - 1); i <= Math.min(board.length - 1, y + 1); i++) {
            for (let j = Math.max(0, x - 1); j <= Math.min(board[0].length - 1, x + 1); j++) {
                if (!board[i][j] && board[i][j] !== "bomb") {
                    updatedBoard[i][j] = {type: "empty", revealed: true, count: countNeighbors(j, i)};
                    if (board[i][j] && board[i][j].count === 0) {
                        revealZeros(j, i);
                    }
                }
            }
        }
        setBoard(updatedBoard);
    };

    const boardWidth = boardWidths[level] * 25

    const resetBoard = () => {
        setBoard(generateBoard(boardWidths[level], boardHeights[level], numBombs[level]));
        resetTimer();
        setGameOver(false);
        setIsWin(false);
        clearInterval(intervalRef.current);
    };

    const resetTimer = () => {
        setTime(0);
    };

    useEffect(() => {
        if (!gameOver) {
            // @ts-ignore
            intervalRef.current = setInterval(() => {
                setTime(time => time + 1);
            }, 1000);
        }
        return () => {
            clearInterval(intervalRef.current);
        };
    }, [gameOver]);

    useEffect(() => {
        if (!gameOver) {
            for (let i = 0; i < board.length; i++) {
                for (let j = 0; j < board[0].length; j++) {
                    if (board[i][j] && board[i][j].type !== "bomb" && !board[i][j].revealed) {
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
    }, [board, gameOver, isWin]);

    return (
        <div className="bg-gray-100 rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
                <Timer time={time}/>
                <div className="space-x-4">
                    <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            onClick={resetBoard}>Abandonner la partie
                    </button>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={revealBombs}>Tricher
                    </button>
                </div>
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
                                                ? cell.type === "bomb"
                                                    ? "bg-red-600"
                                                    : "bg-gray-400"
                                                : "bg-gray-200 hover:bg-gray-300"
                                        } text-white font-bold rounded`}
                                        style={{width: '25px', height: '25px'}}
                                        onClick={() => handleClick(x, y)}
                                        disabled={cell && cell.revealed}
                                    >
                                        {cell && cell.revealed ? (
                                            cell.type === "bomb" ? "💣" : cell.count
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


export default Board;