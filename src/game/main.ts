import { WebGPUEngine } from "babylonjs";

/**
 * Сущность создания игрового лобби
 */
export default class Game {
    /**
     * Движок.
     */
    private engine;
    constructor(engine: WebGPUEngine) {
        this.engine = engine;
    }
}