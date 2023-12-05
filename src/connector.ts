import Menu from './menu/root';
import { WebGPUEngine } from 'babylonjs';
import { ApiProvider } from './services/ApiProvider';

export default class Connector {
    private engine;
    private viewport;

    constructor(engine: WebGPUEngine, viewport: HTMLCanvasElement) {
        this.engine = engine;
        this.viewport = viewport;

        // this.connect().then(() => {
            this.draw();
        // }).catch(e => alert(`Ошибка 234 ${e.message}`));
    }

    private async connect() {
        ApiProvider.GET('users', (data: object) => {
            console.log(data);
        });

        return true;
    }

    private draw() {
        new Menu(this.engine, this.viewport);
    }
};
