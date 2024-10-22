import { Scene } from 'phaser';
import { getPhrase } from '../service/translations';

export class GameOver2 extends Scene {
    constructor() {
        super('GameOver2');
    }

    init(data) {
        this.sharedScore = data.sharedScore;
        this.jawasKilled = data.jawasKilled;
    }

    create() {
        this.add.image(960, 540, 'fondomenu');
        // Mostrar el puntaje de Player 1
        this.add.text(960, 400, `Puntaje: ${this.sharedScore}`, {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff', 
            stroke: '#000000', strokeThickness: 8, align: 'center'
        }).setOrigin(0.5);

        // Mostrar la cantidad de Jawas eliminados
        this.add.text(960, 600, `Jawas Eliminados: ${this.jawasKilled}`, {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff', 
            stroke: '#000000', strokeThickness: 8, align: 'center'
        }).setOrigin(0.5);

        // Botón para volver al menú principal
        const buttonBack = this.add.text(80, 1040, getPhrase('Atras'), {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8, align: 'center'
        }).setOrigin(0.5);

        buttonBack.setInteractive({ cursor: 'pointer' });
        buttonBack.on('pointerdown', () => {
            this.scene.start('MainMenu');
        });
    }
}
