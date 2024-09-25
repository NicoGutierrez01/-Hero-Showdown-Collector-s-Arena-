import { Scene } from 'phaser';

export class Vs extends Scene
{
    constructor ()
    {
        super('Vs');
    }

    create ()
    {
        this.cameras.main.setBackgroundColor(0x00ff00);

        this.add.image(960, 540, 'background').setAlpha(0.5).setScale(2.7);

        this.add.text(960, 540, 'Make something fun!\nand share it with us:\nsupport@phaser.io', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        this.input.once('pointerdown', () => {

            this.scene.start('GameOver');

        });
    }
}
