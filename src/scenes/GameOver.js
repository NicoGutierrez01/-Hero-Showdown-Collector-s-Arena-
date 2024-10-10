import { Scene } from 'phaser';

export class GameOver extends Scene {
    constructor() {
        super('GameOver');
    }

    init(data) {
        this.player1Score = data.player1Score;
        this.player2Score = data.player2Score;
    }

    create() {
        this.add.image(960, 540, 'fondomenu');

        this.add.text(480, 440, `Puntos jugador 1: ${this.player1Score}`, {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        this.add.text(1440, 440, `Puntos jugador 2: ${this.player2Score}`, {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        let winnerText;
        if (this.player1Score > this.player2Score) {
            winnerText = 'Jugador 1 Gana!';
        } else if (this.player1Score < this.player2Score) {
            winnerText = 'Jugador 2 Gana!';
        } else {
            winnerText = 'Empate!';
        }

        this.add.text(960, 540, winnerText, {
            fontFamily: 'Arial', fontSize: 64, color: '#FFD700'
        }).setOrigin(0.5);

        const buttonBack = this.add.text(80, 1040, 'Atras', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        buttonBack.setInteractive({ cursor: 'pointer' });
        buttonBack.on('pointerdown', () => {
            this.scene.start('MainMenu');  
        });
    }
}
