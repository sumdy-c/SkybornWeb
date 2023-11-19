import * as BABYLON from "babylonjs";

/**
 * Построение меню игрока
 */
export default class Menu {
    /**
     * Движок.
     */
    private engine;
    /**
     * Канвас
     */
    private viewport;

    constructor(engine: BABYLON.WebGPUEngine, viewport: HTMLCanvasElement) {
        this.engine = engine;
        this.viewport = viewport;
        this.create();
    }

    create() {
        var scene = new BABYLON.Scene(this.engine);
        const camera = new BABYLON.ArcRotateCamera(
            "camera1",
            0.53,
            1.2,
            56,
            new BABYLON.Vector3(0, 1, 0),
            scene
        );
        camera.setTarget(BABYLON.Vector3.Zero());
        camera.attachControl(this.viewport, true);
        var light = new BABYLON.HemisphericLight(
            'light',
            new BABYLON.Vector3(0, 1, 0),
            scene,
        );
        light.intensity = 0.7;

        // Our built-in 'sphere' shape.
        var sphere = BABYLON.MeshBuilder.CreateSphere(
            'sphere',
            { diameter: 2, segments: 32 },
            scene,
        );
        sphere.position.y = 1;
        BABYLON.MeshBuilder.CreateGround(
            'ground',
            { width: 6, height: 6 },
            scene,
        );

        return scene;
    }
}
