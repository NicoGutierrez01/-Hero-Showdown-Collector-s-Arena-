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

        this.add.image(420, 450, 'wasd').setScale(0.5);
        this.add.image(1500, 450, 'flechas').setScale(0.5);

        this.add.text(960, 200, getPhrase('Controles'), {
            fontFamily: 'Cooper Black', fontSize: 50, color: '#ffffff',
            stroke: '#000000', strokeThickness: 3,
            align: 'center'
        }).setOrigin(0.5);

        this.add.text(420, 280, getPhrase('Jugador 1'), {
            fontFamily: 'Rockwell', fontSize: 50, color: '#ffffff',
            stroke: '#000000', strokeThickness: 3,
            align: 'center'
        }).setOrigin(0.5);

        this.add.text(1500, 280, getPhrase('Jugador 2'), {
            fontFamily: 'Rockwell', fontSize: 50, color: '#ffffff',
            stroke: '#000000', strokeThickness: 3,
            align: 'center'
        }).setOrigin(0.5);

        this.input.once('pointerdown', () => {
            this.scene.start('Mode');
        });
    }
}