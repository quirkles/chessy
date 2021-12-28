<script lang="ts">
    import {Square, SquareEvent} from "../store/Square";

  export let square: Square = {} as Square
  const store = square.store
</script>

<div
        class="square {square.squareColor} {$store.holdsActivePiece ? 'holdsActivePiece' : ''} {$store.isMovementTarget ? 'isMovementTarget' : ''}"
        on:click={() => square.emit(SquareEvent.SQUARE_CLICKED)}
></div>
<style lang="scss">
  .square {
    flex-grow: 1;
    padding-top: 12.5%;
    &.dark {
      background-color: #333333;
      &.isMovementTarget {
        box-shadow:inset 0px 0px 0px 5px #2276ff;
      }
    }

    &.light {
      background-color: #f4f4f4;
      &.isMovementTarget {
        box-shadow:inset 0px 0px 0px 5px #2276ff;
      }
    }

    &.holdsActivePiece {
      box-shadow:inset 0px 0px 0px 5px #9c1630;
    }
  }
</style>
