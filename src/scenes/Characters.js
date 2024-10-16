import { Scene } from 'phaser';
import { Card } from '../Components/Card';
import { getPhrase } from '../service/translations';

export class Characters extends Scene {
    constructor() {
        super('Characters');
    }

    init(data) {
        this.selectedMode = data.selectedMode; 
    }

    create() {
        this.anims.remove();
        this.add.image(960, 540, 'fondomenu');
        this.initializeCards();
        this.createUI();
    }

    initializeCards() {
        this.selectedCharacter1 = null;
        this.selectedCharacter2 = null;
        this.isWaitingForSelection = true;

        let previouseCard = null;
        const planes = [
            new Card(this, 480, this.scale.height - 810, "lolo", {
                titleTexture: "hierrotitle",
                characterTexture: "hierro"
            }).setScale(1),
            new Card(this, 960, this.scale.height - 270, "san", {
                titleTexture: "pandatitle",
                characterTexture: "panda"
            }).setScale(1),
            new Card(this, 480, this.scale.height - 270, "nico", {
                titleTexture: "jetpacktitle",
                characterTexture: "jetpack"
            }).setScale(1),
            new Card(this, 1440, this.scale.height - 810, "blito", {
                titleTexture: "peztitle",
                characterTexture: "pez"
            }).setScale(1),
            new Card(this, 960, this.scale.height - 810, "dib", {
                titleTexture: "shellytitle",
                characterTexture: "shelly"
            }).setScale(1),
            new Card(this, 1440, this.scale.height - 270, "pato", {
                titleTexture: "zombietitle",
                characterTexture: "zombie"
            }).setScale(1)
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
        const buttonBack = this.add.text(80, 1040, getPhrase('Atras'), {
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

        this.startMessage = this.add.text(this.scale.width / 2, this.scale.height / 2, getPhrase('Comenzar'), {
            fontFamily: 'Arial Black', fontSize: 48, color: '#00ff00',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        this.startMessage.setInteractive({ cursor: 'pointer' });

        this.startMessage.on('pointerdown', () => {
            console.log(`Going to scene: ${this.selectedMode}`);
            console.table(this.selectedCharacter1.characterTexture)
            this.scene.start(this.selectedMode,{player1:this.selectedCharacter1.characterTexture,player2:this.selectedCharacter2.characterTexture});
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