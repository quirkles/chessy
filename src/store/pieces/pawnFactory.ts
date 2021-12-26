import type {BasePiece, PieceInitializationProps} from "./Piece";
import {BasePieceStore, pieceFactory, PieceType} from "./Piece";
import type {Coordinate} from "../Square";
import {Color} from "../Game";
import {get, Writable, writable} from "svelte/store";

export interface PawnStore extends BasePieceStore {
    hasMoved: boolean
}

export interface Pawn extends BasePiece {
    pieceType: PieceType.Pawn
    store: Writable<PawnStore>
}


export function pawnFactory(props: Omit<PieceInitializationProps, 'pieceType'>): Pawn {
    const basePiece = pieceFactory({
        pieceType: PieceType.Pawn,
        ...props,
    })

    const store = writable<PawnStore>({
        hasMoved: false,
        ...get(basePiece.store)
    })

    const pawn = {
        ...basePiece,
        store,
        calculateSquaresPieceCanMoveTo(): Coordinate[] {
            const { hasMoved, position } = get(this.store)
            return hasMoved ? [
                {rank: position.rank + this.color === Color.white ? 1 : -1, file: this.position.file},
            ] : [
                {rank: position.rank + this.color === Color.white ? 1 : -1, file: position.file},
                {rank: position.rank + this.color === Color.white ? 2 : -2, file: position.file},
            ]
        },
        calculateSquaresPieceIsAttacking(): Coordinate[] {
            const { position } = get(this.store)
            return [
                {rank: position.rank + this.color === Color.white ? 1 : -1, file: position.file + 1},
                {rank: position.rank + this.color === Color.white ? 1 : -1, file: position.file - 1},
            ]
        },
    }

    basePiece.calculateSquaresPieceCanMoveTo = pawn.calculateSquaresPieceCanMoveTo.bind(pawn)
    basePiece.calculateSquaresPieceIsAttacking = pawn.calculateSquaresPieceIsAttacking.bind(pawn)
    return pawn as Pawn
}
