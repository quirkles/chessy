<script lang="ts">
  import {Piece} from "../game/Piece";

  export let piece: Piece
  const {position} = piece
  const {rank, file} = position

</script>

<div class="piece {piece.type} {piece.color}" style="top: {(7-rank) * 12.5}%;right: {(7-file) * 12.5}%">
    <img src="assets/{piece.color.toLowerCase()}-{piece.type.toLowerCase()}.png" alt="" >
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
