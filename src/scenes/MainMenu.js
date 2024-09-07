import { Scene } from 'phaser';

export class MainMenu extends Scene
{
    constructor ()
    {
        super('MainMenu');
    }

    create ()
    {
        this.add.image(512, 384, 'fondo').setScale(0.5);

        this.add.text(512, 300, 'Hero Showdown', {
            fontFamily: 'Arial Black', fontSize: 80, color: '#ffffff',
            stroke: '#000000', strokeThickness: 3,
            align: 'center'
        }).setOrigin(0.5);

        const buttonPlay = this.add.text(512, 450, 'Play', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        const buttonConfig = this.add.text(512, 500, 'Configuración', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        const buttonCredits = this.add.text(512, 550, 'Creditos', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
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
