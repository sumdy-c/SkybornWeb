import Connector from './connector';
import * as BABYLON from "babylonjs";

/**
 * Контролёр точки отрисовки.
 * @param root - элемент холста.
 */
class RootController {
    private root;
    constructor(root: Element) {
        this.root = <HTMLCanvasElement>root;
        if (!this.setViewPort()) {
            console.log(
                'ошибка 1',
            );
            return;
        } 
        this.createEngine().then((engine) => {

            window.addEventListener("resize", function () {
                engine.resize();
            });

            new Connector(engine, this.root);
            
        }).catch((error) => {
            console.log(error.message);
            console.log('ошибка 2')
        });
    }

    private setViewPort() {
        const body = document.querySelector('body'),
            html = document.querySelector('html');
        if (body && html) {
            body.style.margin = '0';
            body.style.height = '100vh';
            body.style.width = '100vw';
            body.style.overflow = 'hidden';
            html.style.margin = '0';
            this.root.style.width = `100%`;
            this.root.style.height = `100%`;
            return true;
        }
        return false;
    }

    async createEngine() {
        const engine = new BABYLON.WebGPUEngine(this.root);
        await engine.initAsync();
        return engine;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const root = document.querySelector<HTMLCanvasElement>('#root');
    root && new RootController(root);
});
