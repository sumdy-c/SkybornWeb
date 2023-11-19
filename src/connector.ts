import Menu from './menu/main';
import * as BABYLON from 'babylonjs';
import Render from './render';

export default class Connector {
    private engine;
    private viewport;

    constructor(engine: BABYLON.WebGPUEngine, viewport: HTMLCanvasElement) {
        this.engine = engine;
        this.viewport = viewport;

        this.connect();
    }

    private connect() {
        const scene = new Menu(this.engine, this.viewport).create();
        Render.init(scene, this.engine);
        Render.up();
    }
}
