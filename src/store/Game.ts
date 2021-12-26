import {boardFactory} from "./Board";
import {PubSub} from "../PubSub";
import {writable} from "svelte/store";

export enum Color {
    black = 'black',
    white = 'white',
}

export interface GameInitializationParams {
    ranks?: number
    files?: number
}

export const gameFactory = (gameInitializationParams: GameInitializationParams = {}) => {
    const pubSub = new PubSub()
    const ranks = gameInitializationParams.ranks || 8
    const files = gameInitializationParams.files || 8


    const board = boardFactory({
        pubSub,
        ranks,
        files
    })
    const state = {}
    const store = writable(state)
    return {
        gameStore: store,
        board
    }
}

