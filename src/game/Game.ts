import {Board} from "./Board";

export enum Color {
    black = 'black',
    white = 'white',
}

export interface GameInitializationParams {
    ranks?: number
    files?: number
}

export class Game {
    private ranks = 8
    private files = 8
    public board: Board
    
    private playerToMoveNext = Color.white

    constructor(gameInitializationParams: GameInitializationParams = {}) {
        this.ranks = gameInitializationParams.ranks || this.ranks
        this.files = gameInitializationParams.files || this.files

        this.board = new Board({
            ranks: this.ranks,
            files: this.files
        })
    }
}
