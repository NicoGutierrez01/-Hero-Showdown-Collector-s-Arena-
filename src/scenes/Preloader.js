import { Scene } from 'phaser';

export class Preloader extends Scene
{
    constructor ()
    {
        super('Preloader');

        this.intro;
        this.debug;
    }

    preload ()
    {

        this.load.setPath('assets');

        this.load.spritesheet('player', 'animPJ.png', {
            frameWidth: 207, 
            frameHeight: 221 
        });

        this.load.image('logo', 'logo.png');
        this.load.image('fondo', 'fondo.jpeg');
        this.load.image('negro','negro.png');
        this.load.image('jetpack', 'Jetpackk.png');
        this.load.image('pez', 'pez.png');
        this.load.image('hierro','hierro.png');
        this.load.image('panda','panda.png');
        this.load.image('zombie','zombie.png');
        this.load.image('shelly','shelly.png');
        this.load.image('title', 'title.png');
        this.load.image('cover', 'cover.png');
        this.load.image('triangle', 'triangle.png');
        this.load.image('Argentina', 'Argentina.webp');
        this.load.image('Brasil', 'Brasil.png');
        this.load.image('EEUU', 'EEUU.png');
        this.load.image('devil', 'devil.png');
        this.load.image('gun', 'gun.png');
        this.load.image('bomb', 'bomb.png');
        this.load.image('spade', 'spade.png');

        this.load.setPath('video');

        this.load.video('intro', 'intro.mp4');
    }

    create ()
    {

        this.scene.start('Inicio');
    }
}
