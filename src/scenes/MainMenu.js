import { Scene } from 'phaser';

export class MainMenu extends Scene
{
    constructor ()
    {
        super('MainMenu');
    }

    create ()
    {
        this.add.image(960, 540, 'fondomenu');

        this.add.text(960, 300, 'Hero Showdown', {
            fontFamily: 'Arial Black', fontSize: 100, color: '#ffffff',
            stroke: '#000000', strokeThickness: 3,
            align: 'center'
        }).setOrigin(0.5);

        const buttonPlay = this.add.text(960, 450, 'Jugar', {
            fontFamily: 'Arial Black', fontSize: 50, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        const buttonConfig = this.add.text(960, 550, 'Configuración', {
            fontFamily: 'Arial Black', fontSize: 50, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        const buttonCredits = this.add.text(960, 650, 'Creditos', {
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