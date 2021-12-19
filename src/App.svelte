<script lang="ts">
	import {Game} from "./game/Game";
	import Board from "./components/Board.svelte";

	const game = new Game()
</script>

<main>
	<Board board={game.board}/>
</main>

<style>

</style>
