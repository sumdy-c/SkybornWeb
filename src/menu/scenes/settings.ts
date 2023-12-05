import { WebGPUEngine, Scene, ArcRotateCamera, Vector3, HemisphericLight, MeshBuilder } from "babylonjs";

export class Setting {
    /**
     * Движок.
     */
    private engine;
    /**
     * Канвас
     */
    private viewport;

    constructor(engine: WebGPUEngine, viewport: HTMLCanvasElement) {
        this.engine = engine;
        this.viewport = viewport;
    }

    scene() {
        let scene = new Scene(this.engine);
        const camera = new ArcRotateCamera(
            'camera1',
            0.53,
            1.2,
            56,
            new Vector3(0, 1, 0),
            scene,
        );
        camera.setTarget(Vector3.Zero());
        camera.attachControl(this.viewport, true);
        var light = new HemisphericLight(
            'light',
            new Vector3(0, 1, 0),
            scene,
        );
        light.intensity = 0.7;

        var sphere = MeshBuilder.CreateSphere(
            'sphere',
            { diameter: 2, segments: 32 },
            scene,
        );
        sphere.position.y = 1;
        MeshBuilder.CreateGround(
            'ground',
            { width: 6, height: 6 },
            scene,
        );

        return scene;
    }
}
