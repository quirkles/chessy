import type {Color} from "./Game";
import type {Coordinate} from "./Square";

export enum PieceType {
    Pawn = 'Pawn',
    Bishop = 'Bishop',
    Knight = 'Knight',
    Rook = 'Rook',
    King = 'King',
    Queen = 'Queen',
}

interface PieceInitializationProps {
    color: Color,
    position: Coordinate,
    type: PieceType
}

export class Piece {
    color: Color
    position: Coordinate
    type: PieceType

    constructor(props: PieceInitializationProps) {
        this.color = props.color
        this.position = props.position
        this.type = props.type
    }
}

export class Pawn extends Piece {
    constructor(props: Omit<PieceInitializationProps, 'type'>) {
        super({
            type: PieceType.Pawn,
            ...props
        })
    }
}

export class Bishop extends Piece {
    constructor(props: Omit<PieceInitializationProps, 'type'>) {
        super({
            type: PieceType.Bishop,
            ...props
        })
    }
}

export class Knight extends Piece {
    constructor(props: Omit<PieceInitializationProps, 'type'>) {
        super({
            type: PieceType.Knight,
            ...props
        })
    }
}

export class Rook extends Piece {
    constructor(props: Omit<PieceInitializationProps, 'type'>) {
        super({
            type: PieceType.Rook,
            ...props
        })
    }
}

export class King extends Piece {
    constructor(props: Omit<PieceInitializationProps, 'type'>) {
        super({
            type: PieceType.King,
            ...props
        })
    }
}

export class Queen extends Piece {
    constructor(props: Omit<PieceInitializationProps, 'type'>) {
        super({
            type: PieceType.Queen,
            ...props
        })
    }
}
