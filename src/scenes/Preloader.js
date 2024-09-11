import { Scene } from 'phaser';

export class Preloader extends Scene
{
    constructor ()
    {
        super('Preloader');

        this.intro;
        this.debug;
    }

    init ()
    {
        //  We loaded this image in our Boot Scene, so we can display it here
        this.add.image(512, 384, 'background');

        //  A simple progress bar. This is the outline of the bar.
        this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);

        //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
        const bar = this.add.rectangle(512-230, 384, 4, 28, 0xffffff);

        //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
        this.load.on('progress', (progress) => {

            //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
            bar.width = 4 + (460 * progress);

        });
    }

    preload ()
    {
        //  Load the assets for the game - Replace with your own assets
        this.load.setPath('assets');

        this.load.spritesheet('player', 'ToonPJ.png', {
            frameWidth: 207, // Ajustar según el tamaño de cada frame
            frameHeight: 221 // Ajustar según el tamaño de cada frame
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
        
        //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
        //  For example, you can define global animations here, so we can use them in other scenes.

        //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
        this.scene.start('Inicio');
    }
}
