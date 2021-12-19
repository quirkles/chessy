<script lang="ts">
  import {Square} from "../game/Square";

  export let square: Square
</script>

<div class="square {square.squareColor}"></div>
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
  }
</style>
