<script lang="ts">
    import Square from "./Square.svelte";
    import {Board} from "../game/Board";
    import Piece from "./Piece.svelte";

    export let board: Board
</script>
<div class="board">
    {#if board && board.squares}
        {#each board.squares as rowOfSquares, rank}
            <div class="row">
                {#each board.squares[rank] as square}
                    <Square square={square}/>
                {/each}
            </div>
        {/each}
        {#each board.pieces as piece}
            <Piece piece={piece}/>
        {/each}
    {/if}
</div>
<style lang="scss">
  .board {
    position: absolute;
    display: flex;
    flex-direction: column;
    /* Extra small devices (phones, 600px and down) */
    @media only screen and (max-width: 600px) {
      width: 100vw;
      height: 100vw;
    }

    /* Small devices (portrait tablets and large phones, 600px and up) */
    @media only screen and (min-width: 600px) {
      width: 100vw;
      height: 100vw;
    }

    /* Medium devices (landscape tablets, 768px and up) */
    @media only screen and (min-width: 768px) {
      width: 500px;
      height: 500px;
    }

    /* Large devices (laptops/desktops, 992px and up) */
    @media only screen and (min-width: 992px) {
      width: 750px;
      height: 750px;
    }

    /* Extra large devices (large laptops and desktops, 1200px and up) */
    @media only screen and (min-width: 1200px) {
      width: 750px;
      height: 750px;
    }

    > .row {
      width: 100%;
      display: flex;
      flex-direction: row;
    }
  }
</style>
