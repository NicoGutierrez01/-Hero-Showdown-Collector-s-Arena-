import { Scene } from 'phaser';
import { getPhrase } from '../service/translations';

export class MainMenu extends Scene
{
    constructor ()
    {
        super('MainMenu');
    }

    init(){
        const savedVolume = localStorage.getItem('gameVolume') ? parseInt(localStorage.getItem('gameVolume'), 10) : 100;

        if (!this.TrackMenu || !this.TrackMenu.isPlaying) {
            this.TrackMenu = this.sound.add('TrackMenu', { volume: savedVolume / 100, loop: true });
            this.TrackMenu.play();
        } else if (this.TrackMenu.isPaused) {
            this.TrackMenu.resume();
        }
    }

    create ()
    {
        this.add.image(960, 540, 'fondomenu');

        this.add.image(960, 300, 'titleHero');

        const buttonPlay = this.add.text(960, 550, getPhrase('Jugar'), {
            fontFamily: 'Cooper Black', fontSize: 50, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        const buttonConfig = this.add.text(960, 650, getPhrase('Configuración'), {
            fontFamily: 'Cooper Black', fontSize: 50, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        const buttonCredits = this.add.text(960, 750, getPhrase('Créditos'), {
            fontFamily: 'Cooper Black', fontSize: 50, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        buttonPlay.setInteractive({ cursor: 'pointer' });
        buttonCredits.setInteractive({ cursor: 'pointer' });
        buttonConfig.setInteractive({ cursor: 'pointer' });
        
        this.r = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);



        buttonPlay.on('pointerdown', () => {
            this.TrackMenu.pause();
            this.scene.start('Controls');
        });

        buttonConfig.on('pointerdown', () => {
            this.TrackMenu.pause();
            this.scene.start('Config');
        });

        buttonCredits.on('pointerdown', () =>{
            this.scene.start('Credits');
        });
    }

    update(){
        if (this.r.isDown) {
            this.scene.start('Inicio');
            this.TrackMenu.pause();
          }
    }
}