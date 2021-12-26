<script lang="ts">
	import {gameFactory} from "./store/Game";
	import Board from "./components/Board.svelte";

	const game = gameFactory()
</script>

<main>
	<Board board={game.board}/>
</main>

<style>

</style>
