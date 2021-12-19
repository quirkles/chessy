enum SquareColor {
    light= 'light',
    dark= 'dark'
}

export interface Coordinate {
    rank: number
    file: number
}

export class Square {
    private coordinate: Coordinate
    public squareColor: SquareColor
    constructor(coordinate: Coordinate) {
        this.coordinate = coordinate
        this.squareColor = (coordinate.rank + coordinate.file) % 2 === 0 ? SquareColor.dark : SquareColor.light
    }
}
