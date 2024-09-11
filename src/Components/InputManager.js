/**
 * @typedef {Object} Callbacks
 * @property {Function|null} up
 * @property {Function|null} down
 * @property {Function|null} left
 * @property {Function|null} right
 * @property {Function|null} action
 * @property {Function|null} stop
 */

import { inputConfigs } from "../utils/inputConfigs";

export class InputManager {
    /**
     * @param {Object} params
     * @param {Object} params.scene
     * @param {Object|null} [params.inputConfig]
     * @param {Callbacks|null} [params.callbacks]
     */
    constructor({scene, inputConfig = null, callbacks = null}) {
        this.scene = scene;
        this.inputConfig = inputConfig || inputConfigs.defaultInputConfigs;

        this.callbacks = callbacks || {
            up: null,
            down: null,
            left: null,
            right: null,
            action: null,
            stop: null
        };

        this.lastPointerPosition = { x: 0, y: 0 };
        this.allKeys = this.listAllKeys();
        this.initKeyboardListeners();
        // this.initMouseListeners();
    }

    listAllKeys() {
        // tomar las teclas de inputConfig y devolver un array con todas las teclas
        const allKeys = Object.values(this.inputConfig).flat();
        return allKeys;
    }

    initKeyboardListeners() {
        this.scene.input.keyboard.on('keydown', (event) => {
            this.processInput(event.key.toUpperCase());
        });

        this.scene.input.keyboard.on('keyup', (event) => {
            if (this.allKeys.includes(event.key.toUpperCase()) && this.callbacks.stop) {
                this.callbacks.stop();
            }
        });
    }

    initMouseListeners() {
        this.scene.input.on('pointerdown', (pointer) => {
            if (this.inputConfig.action.includes('CLICK')) {
                this.processInput('CLICK');
            }
        });

        this.scene.input.on('pointermove', (pointer) => {
            this.handleMouseMovement(pointer);
        });
    }

    handleMouseMovement(pointer) {
        const deltaX = pointer.x - this.lastPointerPosition.x;
        const deltaY = pointer.y - this.lastPointerPosition.y;
        
        // Umbral para considerar movimiento significativo
        const threshold = 5;

        if (Math.abs(deltaX) > threshold || Math.abs(deltaY) > threshold) {
            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                if (deltaX > 0 && this.callbacks.right) {
                    this.callbacks.right(); 
                } else if (deltaX < 0 && this.callbacks.left) {
                    this.callbacks.left();
                }
            } else {
                if (deltaY > 0 && this.callbacks.down) {
                    this.callbacks.down();
                } else if (deltaY < 0 && this.callbacks.up) {
                    this.callbacks.up();
                }
            }

            // Actualizar la última posición del mouse
            this.lastPointerPosition = { x: pointer.x, y: pointer.y };
        }
    }

    processInput(input) {
        for (let direction in this.inputConfig) {
            if (this.inputConfig[direction].includes(input)) {
                if (this.callbacks[direction]) {
                    this.callbacks[direction](); // Ejecuta el callback correspondiente
                }
                break;
            }
        }
    }

    setCallback(direction, callback) {
        if (this.callbacks.hasOwnProperty(direction)) {
            this.callbacks[direction] = callback;
        }
    }

    setCallbacks(callbacks) {
        this.callbacks = { ...this.callbacks, ...callbacks };
    }

    setInputConfig(config) {
        this.inputConfig = { ...this.inputConfig, ...config };
    }
}
