import {
    Scene,
    WebGPUEngine,
    ArcRotateCamera,
    Vector3,
    HemisphericLight
} from 'babylonjs';
import { GUI3DManager, Button3D } from 'babylonjs-gui';
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

        const manager = new GUI3DManager(scene);
        const button = new Button3D('button');

        button.onPointerClickObservable.add(() => {
            // this.root.change('store');
            
            this.engine.displayLoadingUI();
            
        });

        manager.addControl(button);

        const camera = new ArcRotateCamera(
            'camera1',
            0.53,
            1.2,
            56,
            new Vector3(0, 1, 0),
            scene,
        );
        
        camera.setTarget(button.position);
        camera.attachControl(this.viewport, true);
        
        var light = new HemisphericLight('light', new Vector3(0, 1, 0), scene);
        light.intensity = 0.7;

        return scene;
    }
}
