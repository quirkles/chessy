import {Square, squareFactory} from "./Square";
import {Color} from "./Game";
import type {PubSub} from "../PubSub";
import {GameEvent} from "../PubSub";
import {writable} from "svelte/store";
import {pawnFactory} from "./pieces/pawnFactory";
import type {Piece} from "./pieces";

interface BoardInitializationParams {
    ranks: number
    files: number
    pubSub: PubSub
}

interface BoardStore {
}

export interface Board {
    store: BoardStore
    squares: Square[][]
    pieces: Piece[]
}

export const boardFactory = (boardInitializationParams: BoardInitializationParams) => {
    const {pubSub, ranks, files} = boardInitializationParams
    const store = writable<BoardStore>()
    const squares = []

    let rank = 0
    let file = 0

    while (rank < ranks) {
        if (!squares[ranks - (rank + 1)]) {
            squares[ranks - (rank + 1)] = []
        }
        while (file < files) {
            squares[ranks - (rank + 1)] = [...squares[ranks - (rank + 1)], squareFactory({
                coordinate: {
                    rank,
                    file
                },
                pubSub
            })]
            file += 1
        }
        rank += 1
        file = 0
    }
    
    console.log(squares) //eslint-disable-line

    const pieces = initPieces(pubSub)
    return {
        boardStore: store,
        squares,
        pieces
    }
}
const initPieces = (pubSub: PubSub): any [] => {
    const whitePawns = Array.from({length: 8}).map((_, i) => {
            const position = {
                rank: 1,
                file: i
            }
            const pawn = pawnFactory({
                pubSub: pubSub,
                color: Color.white,
                position
            })
            pubSub.publish(GameEvent.SetPiecePosition, {
                piece: pawn,
                position
            })
            return pawn
        }
    )
    const blackPawns = Array.from({length: 8}).map((_, i) => {
            const position = {
                rank: 6,
                file: i
            }
            const pawn = pawnFactory({
                pubSub: pubSub,
                color: Color.black,
                position
            })
            pubSub.publish(GameEvent.SetPiecePosition, {
                piece: pawn,
                position
            })
            return pawn
        }
    )
    return [
        ...whitePawns,
        ...blackPawns
    ]
}

