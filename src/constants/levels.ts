import {ILevel, Level} from "../interfaces/level";

export const boardWidths: ILevel = {
    [Level.EASY]: 9,
    [Level.MEDIUM]: 16,
    [Level.EXPERT]: 22,
    [Level.MASTER]: 30
};

export const boardHeights: ILevel = {
    [Level.EASY]: 9,
    [Level.MEDIUM]: 16,
    [Level.EXPERT]: 22,
    [Level.MASTER]: 30
};

export const numBombs: ILevel = {
    [Level.EASY]: 10,
    [Level.MEDIUM]: 40,
    [Level.EXPERT]: 99,
    [Level.MASTER]: 200
};

