import {
    WebGPUEngine,
    Scene,
    Color4,
    ArcRotateCamera,
    HemisphericLight,
    Vector3,
    ActionManager,
    ExecuteCodeAction,
    MeshBuilder
} from 'babylonjs';
import Menu from '../root';

export class Store {
    /**
     * Движок.
     */
    private engine;
    /**
     * Канвас
     */
    private viewport;
    private root;

    constructor(engine: WebGPUEngine, viewport: HTMLCanvasElement, root: Menu) {
        this.engine = engine;
        this.viewport = viewport;
        this.root = root;
    }

    scene() {
        let scene = new Scene(this.engine);
        scene.clearColor = new Color4(0, 0, 0, 1);
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

        var cube = MeshBuilder.CreateBox('box', {
            size: 1,
            height: 2,
            width: 2,
        });

        cube.actionManager = new ActionManager(scene);

        cube.actionManager.registerAction(
            new ExecuteCodeAction(
                ActionManager.OnPickTrigger,
                () => this.root.change('main'),
            ),
        );

        cube.position.y = 1;
        MeshBuilder.CreateGround(
            'ground',
            { width: 6, height: 6 },
            scene,
        );

        return scene;
    }
}
