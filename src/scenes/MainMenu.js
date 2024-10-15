import { Scene } from 'phaser';
import { getPhrase } from '../service/translations';

export class MainMenu extends Scene
{
    constructor ()
    {
        super('MainMenu');
    }

    create ()
    {
        this.add.image(960, 540, 'fondomenu');

        this.add.image(960, 300, 'titleHero');

        const buttonPlay = this.add.text(960, 550, getPhrase('Jugar'), {
            fontFamily: 'Arial Black', fontSize: 50, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        const buttonConfig = this.add.text(960, 650, getPhrase('Configuración'), {
            fontFamily: 'Arial Black', fontSize: 50, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        const buttonCredits = this.add.text(960, 750, getPhrase('Créditos'), {
            fontFamily: 'Arial Black', fontSize: 50, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        buttonPlay.setInteractive({ cursor: 'pointer' });
        buttonCredits.setInteractive({ cursor: 'pointer' });
        buttonConfig.setInteractive({ cursor: 'pointer' });
        
        this.r = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);



        buttonPlay.on('pointerdown', () => {
            this.scene.start('Mode');
        });

        buttonConfig.on('pointerdown', () => {
            this.scene.start('Config');
        });

        buttonCredits.on('pointerdown', () =>{
            this.scene.start('Credits');
        });
    }

    update(){
        if (this.r.isDown) {
            this.scene.start('Inicio');
          }
    }
}