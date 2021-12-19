import {Square} from "./Square";
import {Pawn, Piece} from "./Piece";
import {Color} from "./Game";

interface BoardInitializationParams {
    ranks: number
    files: number
}

export class Board {
    public squares: Square[][] = []
    public pieces: Piece[] = []

    constructor(boardInitializationParams: BoardInitializationParams) {
        const {ranks, files} = boardInitializationParams
        let rank = 0
        let file = 0
        while (rank < ranks) {
            if (!this.squares[rank]) {
                this.squares[rank] = []
            }
            while (file < files) {
                this.squares[rank] = [...this.squares[rank], new Square({rank, file})]
                file += 1
            }
            rank += 1
            file = 0
        }
        this.initPieces()
    }

    initPieces(): void {
        const whitePawns = Array.from({length: 8}).map((_, i) => new Pawn({
                color: Color.white,
                position: {
                    rank: 1,
                    file: i
                }
            })
        )
        const blackPawns = Array.from({length: 8}).map((_, i) => new Pawn({
                color: Color.black,
                position: {
                    rank: 6,
                    file: i
                }
            })
        )
        this.pieces = [
            ...this.pieces,
            ...whitePawns,
            ...blackPawns
        ]
    }
}

