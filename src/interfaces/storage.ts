export interface StoreBase {
    win: boolean;
    cheat: boolean;
    level: string;
    time: number;
}

export interface HistoryGame extends StoreBase {

}

export interface RankingGame extends StoreBase {

}