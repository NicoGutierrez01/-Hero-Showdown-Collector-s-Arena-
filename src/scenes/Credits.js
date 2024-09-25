import { Scene } from 'phaser';

export class Credits extends Scene
{
    constructor ()
    {
        super('Credits');
    }

    create ()
    {
        this.add.text(960, 540, 'GAGLE games', {
            fontFamily: 'Arial Black', fontSize: 80, color: '#ffffff',
            stroke: '#000000', strokeThickness: 3,
            align: 'center'
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
