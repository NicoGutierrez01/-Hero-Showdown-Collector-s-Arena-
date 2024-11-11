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

        //fondos
        this.load.image('fondovs', 'fondovs.png');
        this.load.image('fondomenu', 'fondomenu.png'); 
        this.load.image('fondomode', 'fondomode.png');
        this.load.image('fondocoop', 'fondocoop.png');
        this.load.image('wasd', 'wasd.png');
        this.load.image('flechas', 'flechas.png');
        this.load.image('fondocharacters', 'fondocharacters.png');

        //titles
        this.load.image('peztitle', 'peztitle.png');
        this.load.image('pandatitle', 'pandatitle.png');
        this.load.image('jetpacktitle', 'jetpacktitle.png');
        this.load.image('shellytitle', 'shellytitle.png');
        this.load.image('hierrotitle', 'hierrotitle.png');
        this.load.image('zombietitle', 'zombietitle.png');
        this.load.image('titleHero', 'titleHero.png');
        this.load.image('titleHero', 'titleHero.png');

        //characters selector 
        this.load.image('jetpack', 'jetpack.png');
        this.load.image('pez', 'pez.png');
        this.load.image('hierro','hierro.png');
        this.load.image('panda','panda.png');
        this.load.image('zombie','zombie.png');
        this.load.image('shelly','shelly.png');

        //characters creator
        this.load.image('nico', 'nico.png');
        this.load.image('lolo', 'lolo.png');
        this.load.image('dib', 'dib.png');
        this.load.image('pato', 'pato.png');
        this.load.image('san', 'san.png');
        this.load.image('blito', 'blito.png');

        //characters sprites 
        this.load.spritesheet('pezspade', 'pezspade.png', {
            frameWidth: 190, 
            frameHeight: 206
        });
        this.load.spritesheet('pezgun', 'pezgun.png', {
            frameWidth: 190, 
            frameHeight: 206
        });
        this.load.spritesheet('shellyspade', 'shellyspade.png', {
            frameWidth: 190, 
            frameHeight: 206
        });
        this.load.spritesheet('shellygun', 'shellygun.png', {
            frameWidth: 190, 
            frameHeight: 206
        });
        this.load.spritesheet('jetpackspade', 'jetpackspade.png', {
            frameWidth: 190, 
            frameHeight: 206
        });
        this.load.spritesheet('jetpackgun', 'jetpackgun.png', {
            frameWidth: 190, 
            frameHeight: 206
        });

        //objects
        this.load.spritesheet('bomb', 'bomb.png', {
            frameWidth: 292, 
            frameHeight: 192
        });
        this.load.image('bullet', 'bullet.png');

        //flags
        this.load.image('Argentina', 'Argentina.webp');
        this.load.image('Brasil', 'Brasil.png');
        this.load.image('EEUU', 'EEUU.png');
        
        //boss
        this.load.spritesheet('animdevil', 'animdevil.png', {
            frameWidth: 813, 
            frameHeight: 561
        });

        //subditos
        this.load.image('jawaA', 'jawaA.png');
        this.load.image('jawaV', 'jawaV.png');

        //platforms
        this.load.image('platform', 'platform.png');
        this.load.image('platform2', 'platform2.png');
        this.load.image('negro', 'negro.png');

        //items
        this.load.image('points', 'ItemPoints.png');
        this.load.image('life', 'ItemLife.png');
        this.load.image('velocity', 'ItemVelocity.png');
        this.load.image('Lives', 'Lives.png');
        
        this.load.image('triangle', 'triangle.png');
        this.load.image('botonback', 'botonback.png');

        this.load.setPath('video');

        //video intro
        this.load.video('intro', 'intro.mp4');

        this.load.setPath('audio');

        //audio
        this.load.audio('TrackMenu', 'TrackMenu.mp3');
        this.load.audio('TrackGame', 'TrackGame.mp3');
        this.load.audio('TrackConfig', 'TrackConfig.flac');

        //audio fx
        this.load.audio('Bomba', 'Bomba.mp3');
        this.load.audio('Bossdaño', 'Bossdaño.mp3');
        this.load.audio('BotonJUGAR', 'BotonJUGAR.mp3');
        this.load.audio('espada1', 'espada1.mp3');
        this.load.audio('espada2', 'espada2.mp3');
        this.load.audio('espada3', 'espada3.mp3');
        this.load.audio('Heroessalto', 'Heroessalto.mp3');
        this.load.audio('interfaz1', 'interfaz1.mp3');
        this.load.audio('interfaz2', 'interfaz2.mp3');
        this.load.audio('item', 'item.mp3');
        this.load.audio('Pistola', 'Pistola.mp3');
        this.load.audio('subdito', 'subdito.mp3');
    }

    create ()
    {
        this.scene.start('Inicio');
    }
}
