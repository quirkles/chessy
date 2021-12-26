<script lang="ts">
  import {Piece} from "../store/pieces";
  import type {Coordinate} from "../store/Square";
  import {PieceEvent} from "../store/pieces/Piece";

  export let piece: Piece

  let position: Coordinate = {} as Coordinate

  piece?.store?.subscribe(store => {
    position = store.position
  })
  const {rank, file} = position
</script>

<div
        class="piece {piece.pieceType} {piece.color}"
        style="top: {(7-rank) * 12.5}%;right: {(7-file) * 12.5}%"
        on:click={() => piece.emit(PieceEvent.PIECE_SELECTED)}
>
    <img src="assets/{piece?.color?.toLowerCase()}-{piece?.pieceType?.toLowerCase()}.png" alt="" >
</div>
<style lang="scss">
    .piece {
      height: 12.5%;
      width: 12.5%;
      position: absolute;
      transition: top, right 50ms ease-in-out;
      img {
        max-width: 100%;
        max-height: 100%;
      }
    }
</style>
