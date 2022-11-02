export type Game = {
    title: string;
    pack: number;
    min: number;
    max: number;
}

export type Ranking = {
    key: string;
    displayText: string;
}

export type GameSortment = {
    [key: string]: Game[];
}
