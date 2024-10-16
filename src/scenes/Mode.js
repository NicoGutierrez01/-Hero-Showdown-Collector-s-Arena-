import { Scene } from 'phaser';
import { getPhrase } from '../service/translations';

export class Mode extends Scene {
    constructor() {
        super('Mode');
    }

    create() {
        this.add.image(960, 540, 'fondomode');

        const buttonVs = this.add.zone(960, 270, 1920, 540).setOrigin(0.5);
        buttonVs.setInteractive();

        const buttonCoop = this.add.zone(960, 810, 1920, 540).setOrigin(0.5);
        buttonCoop.setInteractive();

        const buttonBack = this.add.text(80, 1040, getPhrase ('Atras'), {
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