<script lang="ts">
  import {Square} from "../store/Square";

  export let square: Square = {} as Square
  const store = square.store
</script>

<div class="square {square.squareColor} {$store.holdsActivePiece ? 'holdsActivePiece' : ''}"></div>
<style lang="scss">
  .square {
    flex-grow: 1;
    padding-top: 12.5%;
    &.dark {
      background-color: #333333
    }

    &.light {
      background-color: #f4f4f4
    }

    &.holdsActivePiece {
      box-shadow:inset 0px 0px 0px 10px #f00;
    }
  }
</style>
