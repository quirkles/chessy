import type {Color} from "../Game";
import type {Coordinate} from "../Square";
import type {PubSub} from "../../PubSub";
import {GameEvent} from "../../PubSub";
import {v4} from "uuid";
import {Writable, writable} from "svelte/store";

export enum PieceType {
    Pawn = 'Pawn',
    Bishop = 'Bishop',
    Knight = 'Knight',
    Rook = 'Rook',
    King = 'King',
    Queen = 'Queen',
}

export enum PieceEvent {
    PIECE_SELECTED = 'PIECE_SELECTED'
}

export interface PieceInitializationProps {
    color: Color,
    pieceType: PieceType,
    pubSub: PubSub
    position: Coordinate
}

export interface BasePieceStore {
    position: Coordinate,
    squaresPieceCanMoveTo: Coordinate[]
    squaresPieceIsAttacking: Coordinate[]
}
export interface BasePiece {
    id: string
    color: Color
    pieceType: PieceType
    store: Writable<BasePieceStore>

    emit(event: PieceEvent): void

    calculateSquaresPieceCanMoveTo(): Coordinate[]

    calculateSquaresPieceIsAttacking(): Coordinate[]

    handleNewPosition(position: Coordinate): void
}

export function pieceFactory(props: PieceInitializationProps): BasePiece {
    const id = v4()
    const color = props.color
    const pieceType = props.pieceType
    const pubSub = props.pubSub
    const store = writable<BasePieceStore>({
        position: props.position,
        squaresPieceCanMoveTo: [],
        squaresPieceIsAttacking: []
    })


    const piece = {
        id,
        color,
        pieceType,
        store,

        emit(event: PieceEvent) {
            switch (event) {
                case PieceEvent.PIECE_SELECTED:
                    return pubSub.publish(GameEvent.PieceSelected, {
                        piece: this
                    })
            }
        },

        calculateSquaresPieceCanMoveTo(): Coordinate[] {
            throw new Error("calculateSquaresPieceCanMoveTo must be implemented in all piece types.")
        },
        calculateSquaresPieceIsAttacking(): Coordinate[] {
            throw new Error("calculateSquaresPieceIsAttacking must be implemented in all piece types.")
        },

        handleNewPosition(position: Coordinate): void {
            this.position = position
            this.squaresPieceCanMoveTo = this.calculateSquaresPieceCanMoveTo()
            this.squaresPieceIsAttacking = this.calculateSquaresPieceIsAttacking()
            pubSub.publish(GameEvent.PieceIsAttackingSquares, {
                piece: this,
                squares: this.squaresPieceIsAttacking
            })
        }
    }

    pubSub.subscribe(
        GameEvent.SetPiecePosition,
        function (payload) {
            if (payload.piece.id === this.id) {
                this.handleNewPosition(payload.position)
            }
        },
        piece
    )

    return piece
}
