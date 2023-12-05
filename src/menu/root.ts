import { Scene, WebGPUEngine,  } from 'babylonjs';
import Render from '../render';
import { Main } from './scenes/main';
import { Store } from './scenes/store';
import { Setting } from './scenes/settings';

type SceneStorage = {
    [index: string]: Scene | null;
    main: Scene | null;
    setting: Scene | null;
    store: Scene | null;
};

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
    /**
     * Текущая сцена
     */
    private currentScene: Scene | undefined;
    private scenes: SceneStorage;

    /**
     *
     * @param engine
     * @param viewport
     */
    constructor(engine: WebGPUEngine, viewport: HTMLCanvasElement) {
        this.engine = engine;
        this.viewport = viewport;
        this.scenes = { main: null, store: null, setting: null };

        this.initialization().then(() => {
            this.provider();
        }).catch(e => { console.log(e.message) });
    }

    async initialization() {
        return new Promise((resolve, _reject) => {
            const timer = setInterval(() => {
                let check = true;

                !this.scenes.main ? this.scenes.main = new Main(this.engine, this.viewport, this).scene() : null;
                
                this.currentScene = this.scenes.main;

                !this.scenes.store ? this.scenes.store = new Store(
                    this.engine,
                    this.viewport,
                    this
                ).scene() : null;
                
                !this.scenes.setting ? this.scenes.setting = new Setting(
                    this.engine,
                    this.viewport,
                ).scene() : null;

                Object.values(this.scenes).forEach(scene => {
                    if(this.currentScene?.uid !== scene?.uid) {
                        scene?.detachControl();
                    };

                    if(!scene) {
                        check = false;
                    }
                });
                
                if(check) {
                    clearInterval(timer);
                    resolve(true);
                }
            }, 200);
        });
    };

    change(arg: string) {
        console.log(arg);
        if(this.scenes[arg]) {
            this.currentScene = this.scenes[arg] as Scene;
            Render.change(this.currentScene);
        }
    }

    provider() {
        if(!this.currentScene) {
            return;
        };

        Render.init(this.currentScene, this.engine);
        Render.up();
    };
}
