import * as BABYLON from 'babylonjs';

export default class Render {
    static scene: BABYLON.Scene;
    static engine: BABYLON.WebGPUEngine;

    static init(scene: BABYLON.Scene, engine: BABYLON.WebGPUEngine) {
        Render.scene = scene;
        Render.engine = engine;
    }

    static up() {
        // в runRenderLoop  не должно попасть ничего лишнего!!!
        Render.engine.runRenderLoop(() => Render.scene.render());
        Render.debugLayer();
    };


    static debugLayer() {
        // Подписываемся для включение слоя отладки
        window.addEventListener('keydown', (e) => {
            if(e.shiftKey && e.code === 'KeyD') {
                if(Render.scene.debugLayer.isVisible()) {
                    Render.scene.debugLayer.hide();
                    return;
                };
                Render.scene.debugLayer.show();
            };
        });
    }
};
