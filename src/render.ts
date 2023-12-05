import { Scene, WebGPUEngine } from 'babylonjs';

export default class Render {
    static scene: Scene;
    static engine: WebGPUEngine;

    static init(scene: Scene, engine: WebGPUEngine) {
        Render.scene = scene;
        Render.engine = engine;
    }

    static change(scene: Scene) {
        // Render.scene.dispose();
        Render.scene.detachControl();
        Render.scene = scene;
        Render.scene.attachControl(); 
    }

    static up() {
        // в runRenderLoop  не должно попасть ничего лишнего!!!
        Render.engine.runRenderLoop(() => Render.scene.render());
        Render.debugLayer();
    }

    static debugLayer() {
        // Подписываемся для включение слоя отладки
        window.addEventListener('keydown', (e) => {
            if (e.shiftKey && e.code === 'KeyD') {
                if (Render.scene.debugLayer.isVisible()) {
                    Render.scene.debugLayer.hide();
                    return;
                }
                Render.scene.debugLayer.show();
            }
        });
    }
}
