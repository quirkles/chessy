import { v4 as uuid } from 'uuid'
import type {Piece} from "./store/pieces";
import type {Coordinate, Square} from "./store/Square";

export enum GameEvent {
    SetPiecePosition = 'SetPiecePosition',
    PieceSelected = 'PieceSelected',
    PieceIsAttackingSquares = 'PieceIsAttackingSquares',
    PieceCanMoveToCoordinates = 'PieceCanMoveToCoordinates',
    SquareSelected = 'SquareSelected',
}

export interface GameEventPayloads {
    [GameEvent.SetPiecePosition]: {
        piece: Piece,
        position: Coordinate
    }
    [GameEvent.PieceSelected]: {
        piece: Piece,
    }
    [GameEvent.PieceIsAttackingSquares]: {
        piece: Piece,
        squares: Coordinate[]
    }
    [GameEvent.PieceCanMoveToCoordinates]: {
        piece: Piece,
        squares: Coordinate[],
    }
    [GameEvent.SquareSelected]: {
        square: Square,
    }
}

type Callback<T extends GameEvent> = (payload: GameEventPayloads[T]) => void
type Unsubscribe = () => void

interface Handler {
    id: string
    event: GameEvent
    callback: Callback<GameEvent>
}

export class PubSub {
    handlers: Handler[] = []

    constructor() {}

    subscribe<T extends GameEvent>(event: T, handler: Callback<T>, context?): Unsubscribe {
        const handlerId = uuid()
        if (typeof context === 'undefined') {
            context = handler;
        }
        this.handlers.push({
            id: handlerId,
            event: event,
            callback: handler.bind(context)
        });
        const unsubscribe = function (this: PubSub) {
            this.handlers = this.handlers.filter(({id}) => id !== handlerId)
        }
        unsubscribe.bind(this)
        return unsubscribe
    }

    publish<T extends GameEvent>(event: T, payload: GameEventPayloads[T]): void {
        console.log(`Event: ${event}`) //eslint-disable-line
        console.log(`Payload:`, payload) //eslint-disable-line
        this.handlers.forEach(topic => {
            if (topic.event === event) {
                topic.callback(payload)
            }
        })
    }
}
