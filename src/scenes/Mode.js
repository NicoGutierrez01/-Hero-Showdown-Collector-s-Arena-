import { Scene } from 'phaser';

export class Mode extends Scene {
    constructor() {
        super('Mode');
    }

    create() {
        this.add.image(960, 540, 'fondomode');

        const buttonVs = this.add.text(960, 270, 'Vs', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        const buttonCoop = this.add.text(960, 810, 'Coop', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        const buttonBack = this.add.text(80, 1040, 'Atras', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        this.add.line(960, 540, 0, 0, 1920, 0, 0x000000).setOrigin(0.5);

        buttonCoop.setInteractive({ cursor: 'pointer' });
        buttonVs.setInteractive({ cursor: 'pointer' });
        buttonBack.setInteractive({ cursor: 'pointer' });

        buttonVs.on('pointerdown', () => {
            this.scene.start('Characters', { selectedMode: 'Vs' });
        });

        buttonCoop.on('pointerdown', () => {
            this.scene.start('Characters', { selectedMode: 'Coop' });
        });

        buttonBack.on('pointerdown', () => {
            this.scene.start('MainMenu');
        });
    }
}