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
        this.load.spritesheet('playergun', 'animgun.png', {
            frameWidth: 207,
            frameHeight: 221
        })
        this.load.spritesheet('playerspade', 'animspade.png', {
            frameWidth: 207,
            frameHeight: 221
        })

        //fondos
        this.load.image('fondovs', 'fondovs.png');
        this.load.image('fondomenu', 'fondomenu.png'); 
        this.load.image('fondomode', 'fondomode.png');
        this.load.image('fondocoop', 'fondocoop.png');

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
        this.load.spritesheet('hierrospade', 'hierrospade.png', {
            frameWidth: 201, 
            frameHeight: 309
        });

        this.load.spritesheet('pezspade', 'pezspade.png', {
            frameWidth: 207, 
            frameHeight: 256
        });

        this.load.spritesheet('shellyspade', 'shellyspade.png', {
            frameWidth: 184, 
            frameHeight: 235
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
        this.load.image('devil', 'devil.png');

        //subditos
        this.load.image('jawaA', 'jawaA.png');
        this.load.image('jawaV', 'jawaV.png');
        
        //logo
        this.load.image('logo', 'logo.png');

        this.load.image('negro','negro.png');
        this.load.image('triangle', 'triangle.png');

        this.load.setPath('video');

        //video intro
        this.load.video('intro', 'intro.mp4');
    }

    create ()
    {

        this.scene.start('Inicio');
    }
}
