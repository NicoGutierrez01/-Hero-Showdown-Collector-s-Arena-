import { Scene } from 'phaser';
import { Card } from '../Components/Card';

export class Characters extends Scene {
    constructor() {
        super('Characters');
    }

    init(data) {
        this.selectedMode = data.selectedMode; 
    }

    create() {
        this.initializeCards();
        this.createUI();
    }

    initializeCards() {
        this.selectedCharacter1 = null;
        this.selectedCharacter2 = null;
        this.isWaitingForSelection = true;

        let previouseCard = null;
        const planes = [
            new Card(this, 256, this.scale.height - 576, "cover", {
                titleTexture: "title",
                characterTexture: "hierro"
            }),
            new Card(this, 256, this.scale.height - 384, "cover", {
                titleTexture: "title",
                characterTexture: "panda"
            }),
            new Card(this, 256, this.scale.height - 192, "cover", {
                titleTexture: "title",
                characterTexture: "jetpack"
            }),
            new Card(this, 768, this.scale.height - 576, "cover", {
                titleTexture: "title",
                characterTexture: "pez"
            }),
            new Card(this, 768, this.scale.height - 384, "cover", {
                titleTexture: "title",
                characterTexture: "shelly"
            }),
            new Card(this, 768, this.scale.height - 192, "cover", {
                titleTexture: "title",
                characterTexture: "zombie"
            })
        ];

        this.input.on(Phaser.Input.Events.POINTER_DOWN, (pointer) => {
            if (!this.isWaitingForSelection) return;

            const { x, y } = pointer;
            const card = planes.find(card => card.hasFaceAt(x, y));

            if (card) {
                if (!this.selectedCharacter1) {
                    this.selectedCharacter1 = card;
                    card.moveCard();
                } else if (!this.selectedCharacter2 && card !== this.selectedCharacter1) {
                    this.selectedCharacter2 = card;
                    card.moveCard();
                    this.time.delayedCall(500, () => {
                        this.showStartMessage();
                    });
                }
                if (this.selectedCharacter1 && this.selectedCharacter2) {
                    this.isWaitingForSelection = false;
                }
            }
        });
    }

    createUI() {
        const buttonBack = this.add.text(80, 720, 'Back', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        buttonBack.setInteractive({ cursor: 'pointer' });

        buttonBack.on('pointerdown', () => {
            this.scene.start('Mode');
        });
    }

    showStartMessage() {
        if (this.startMessage) {
            this.startMessage.destroy();
        }

        this.startMessage = this.add.text(this.scale.width / 2, this.scale.height / 2, 'Comenzar', {
            fontFamily: 'Arial Black', fontSize: 48, color: '#00ff00',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        this.startMessage.setInteractive({ cursor: 'pointer' });

        this.startMessage.on('pointerdown', () => {
            console.log(`Going to scene: ${this.selectedMode}`);
            this.scene.start(this.selectedMode);
        });
    }

    restart() {
        this.selectedCharacter1 = null;
        this.selectedCharacter2 = null;
        this.isWaitingForSelection = true;
        if (this.startMessage) {
            this.startMessage.destroy();
        }
        this.initializeCards();
    }

    shutdown() {
        this.restart();
    }
}