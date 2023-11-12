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
        // This creates a basic Babylon Scene object (non-mesh)
        var scene = new BABYLON.Scene(this.engine);

        // This creates and positions a free camera (non-mesh)
        const camera = new BABYLON.ArcRotateCamera(
            "camera1",
            0.53,
            1.2,
            56,
            new BABYLON.Vector3(0, 1, 0),
            scene
        );

        // This targets the camera to scene origin
        camera.setTarget(BABYLON.Vector3.Zero());

        // This attaches the camera to the canvas
        camera.attachControl(this.viewport, true);

        // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
        var light = new BABYLON.HemisphericLight(
            'light',
            new BABYLON.Vector3(0, 1, 0),
            scene,
        );

        // Default intensity is 1. Let's dim the light a small amount
        light.intensity = 0.7;

        // Our built-in 'sphere' shape.
        var sphere = BABYLON.MeshBuilder.CreateSphere(
            'sphere',
            { diameter: 2, segments: 32 },
            scene,
        );

        // Move the sphere upward 1/2 its height
        sphere.position.y = 1;

        // Our built-in 'ground' shape.
        BABYLON.MeshBuilder.CreateGround(
            'ground',
            { width: 6, height: 6 },
            scene,
        );

        // if(confirm('TEST')) {
        //     const sound = new BABYLON.Sound("sound", "../../public/asset/test.mp3", scene, null, { autoplay: true  });
        // }

        return scene;
    }
}
