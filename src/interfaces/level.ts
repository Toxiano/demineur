export enum Level {
    EASY = 'EASY',
    MEDIUM = 'MEDIUM',
    EXPERT = 'EXPERT',
    MASTER = 'MASTER',
}

export interface ILevel {
    [Level.EASY]: number,
    [Level.MEDIUM]: number,
    [Level.EXPERT]: number,
    [Level.MASTER]: number,
}