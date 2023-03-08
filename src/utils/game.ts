import {Status} from "../interfaces/status";

export const generateBoard = (width: number, height: number, numBombs: number) => {
    const board = Array(height)
        .fill(null)
        .map(() => Array(width).fill(null));

    let bombsPlaced = 0;
    while (bombsPlaced < numBombs) {
        const x = Math.floor(Math.random() * width);
        const y = Math.floor(Math.random() * height);

        if (!board[y][x]) {
            board[y][x] = {type: Status.BOMB, revealed: false};
            bombsPlaced++;
        }
    }

    return board;
};

export const countNeighbors = (x: number, y: number, board: any[][]) => {
    let neighbors = 0;
    for (let i = Math.max(0, y - 1); i <= Math.min(board.length - 1, y + 1); i++) {
        for (let j = Math.max(0, x - 1); j <= Math.min(board[0].length - 1, x + 1); j++) {
            if (board[i][j] && board[i][j].type === Status.BOMB) neighbors++;
        }
    }
    return neighbors;
};

export const revealZeros = async (x: number, y: number, board: any[][]) => {
    let updatedBoard = [...board];
    for (let i = Math.max(0, y - 1); i <= Math.min(board.length - 1, y + 1); i++) {
        // await sleep(1)
        for (let j = Math.max(0, x - 1); j <= Math.min(board[0].length - 1, x + 1); j++) {
            // await sleep(1)
            if (!board[i][j] && board[i][j] !== Status.BOMB) {
                updatedBoard[i][j] = {type: Status.EMPTY, revealed: true, count: countNeighbors(j, i, board)};
                if (board[i][j] && board[i][j].count === 0) {
                    await revealZeros(j, i, board);
                }
            }
        }
    }
    return updatedBoard
};

export const revealHideBombs = (board: any[][], reveal: boolean) => {
    const updatedBoard = [...board];
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            if (board[i][j] && board[i][j].type === Status.BOMB) {
                updatedBoard[i][j].revealed = reveal;
            }
        }
    }
    return updatedBoard;
};