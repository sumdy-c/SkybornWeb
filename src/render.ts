import * as BABYLON from 'babylonjs';

export default class Render {
    static scene: BABYLON.Scene;
    static engine: BABYLON.WebGPUEngine;

    static init(scene: BABYLON.Scene, engine: BABYLON.WebGPUEngine) {
        Render.scene = scene;
        Render.engine = engine;
    }

    static up() {
        Render.engine.runRenderLoop(function () {
            Render.scene.render();
        });
    }
};
