import { Scene } from 'phaser';
import { getPhrase } from '../service/translations';

export class Controls extends Scene
{
    constructor ()
    {
        super('Controls');
    }

    create ()
    {
        this.add.image(960, 540, 'fondomenu');

        this.add.text(960, 540, getPhrase('Controles'), {
            fontFamily: 'Arial Black', fontSize: 80, color: '#ffffff',
            stroke: '#000000', strokeThickness: 3,
            align: 'center'
        }).setOrigin(0.5);

        this.input.once('pointerdown', () => {
            this.scene.start('Mode');
        });
    }
}