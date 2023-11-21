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
        /**
         * Код из стартовой сцены, служит лишь примером, что работает рендер. Необходимо почистить)
         * Из этой функции необходимо вернуть сцену, но поскольку меню вполне можно переключить например на магазин.
         * Учти, для каждого меню ( главное, магазин, достяжения и пр.) мы пишем сцену отдельно. Соответственно, класс меню просто поставщик этих сцен
         * Так что думай о нём как о root в  реакте, возвращай сюда необходимую сцену. 
         */
        let scene = new BABYLON.Scene(this.engine);
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
