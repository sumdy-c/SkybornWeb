import {
    Scene,
    WebGPUEngine,
    ArcRotateCamera,
    Vector3,
    HemisphericLight,
    MeshBuilder,
    ActionManager,
    ExecuteCodeAction
} from 'babylonjs';

// import { GUI3DManager } from '@babylonjs/gui';
import Menu from '../root';

export class Main {
    /**
     * Движок.
     */
    private engine;
    /**
     * Канвас
     */
    private viewport;
    /**
     * Получаем родителя
     */
    private root;

    constructor(engine: WebGPUEngine, viewport: HTMLCanvasElement, root: Menu) {
        this.engine = engine;
        this.viewport = viewport;
        this.root = root;
    }

    scene() {
        let scene = new Scene(this.engine);

        // const manager = new GUI3DManager(scene);

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
        var light = new HemisphericLight('light', new Vector3(0, 1, 0), scene);
        light.intensity = 0.7;

        // Our built-in 'sphere' shape.
        var sphere = MeshBuilder.CreateSphere(
            'sphere',
            { diameter: 2, segments: 32 },
            scene,
        );
        sphere.position.y = 1;

        sphere.actionManager = new ActionManager(scene);

        sphere.actionManager.registerAction(
            new ExecuteCodeAction(
                ActionManager.OnPickTrigger,
                () => this.root.change('store'),
            ),
        );

        MeshBuilder.CreateGround('ground', { width: 6, height: 6 }, scene);
        return scene;
    }
}
