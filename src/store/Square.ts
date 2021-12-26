import {equals, includes} from "ramda"
import {GameEvent, GameEventPayloads, PubSub} from "../PubSub";
import type {Piece} from "./pieces";
import {Writable, writable} from "svelte/store";
import {v4} from "uuid";

enum SquareColor {
    light= 'light',
    dark= 'dark'
}

export interface Coordinate {
    rank: number
    file: number
}

interface SquareInitializationParams {
    coordinate: Coordinate,
    pubSub: PubSub
}

export interface SquareStore {
    holdsActivePiece: boolean
    isMovementTarget: boolean
    pieceSquareIsOccupiedBy: Piece | null
}

export interface Square {
    id: string
    store: Writable<SquareStore>
    squareColor: SquareColor
    coordinate: Coordinate
}

export function squareFactory (params: SquareInitializationParams): Square {
    const id = v4()
    const squareColor: SquareColor = (params.coordinate.rank + params.coordinate.file) % 2 === 0 ? SquareColor.dark : SquareColor.light
    const coordinate = params.coordinate
    const pubSub = params.pubSub

    const store = writable<SquareStore>({
        holdsActivePiece: false,
        isMovementTarget: false,
        pieceSquareIsOccupiedBy: null
    })
    
    pubSub.subscribe(GameEvent.SetPiecePosition, (payload) => {
        store.update((store) => {
            if(equals(coordinate, payload.position)) {
                store.pieceSquareIsOccupiedBy = equals(coordinate, payload.position) ? payload.piece : null
            }
            return store
        })
    })

    pubSub.subscribe(GameEvent.PieceSelected, (payload: GameEventPayloads[GameEvent.PieceSelected]) => {
        store.update((store) => {

            store.holdsActivePiece = equals(store.pieceSquareIsOccupiedBy?.id, payload.piece.id);
            return store
        })
    })
    return {
        id,
        store,
        squareColor,
        coordinate
    }
}
