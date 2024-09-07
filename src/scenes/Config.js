import { Scene } from 'phaser';

export class Config extends Scene
{
    constructor ()
    {
        super('Config');
    }

    create ()
    {
        let volume = 50;

        this.add.text(512, 192, 'Idioma', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        const flags = [
            this.add.image(512, 260, 'Argentina').setScale(0.5),
            this.add.image(512, 260, 'EEUU').setScale(0.1).setVisible(false),
            this.add.image(512, 260, 'Brasil').setScale(0.3).setVisible(false)
        ];
        let currentFlagIndex = 0;

        this.add.text(512, 384, 'Sonido', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        const volumeBarBg = this.add.rectangle(512, 450, 150, 20, 0x888888); // Fondo de la barra
        const volumeBar = this.add.rectangle(437, 450, 75, 20, 0xffffff).setOrigin(0, 0.5); // Barra actual

        this.add.text(512, 576, 'Pantalla', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        const Fullscreen = this.add.text(512, 650, 'Completa', {
            fontFamily: 'Arial Black', fontSize: 32, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        const buttonBack = this.add.text(80, 720, 'Back', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        const buttonRight = this.add.image(630, 260, 'triangle').setScale(0.1);
        const buttonLeft = this.add.image(394, 260, 'triangle').setScale(0.1).setAngle(180);

        const buttonRight2 = this.add.image(630, 450, 'triangle').setScale(0.1);
        const buttonLeft2 = this.add.image(394, 450, 'triangle').setScale(0.1).setAngle(180);

        const buttonRight3 = this.add.image(630, 650, 'triangle').setScale(0.1);
        const buttonLeft3 = this.add.image(394, 650, 'triangle').setScale(0.1).setAngle(180);

        buttonRight.setInteractive({ cursor: 'pointer' });
        buttonLeft.setInteractive({ cursor: 'pointer' });

        buttonRight.on('pointerdown', () => {
            flags[currentFlagIndex].setVisible(false);
            currentFlagIndex = (currentFlagIndex + 1) % flags.length;
            flags[currentFlagIndex].setVisible(true);
        });

        buttonLeft.on('pointerdown', () => {
            flags[currentFlagIndex].setVisible(false);
            currentFlagIndex = (currentFlagIndex - 1 + flags.length) % flags.length;
            flags[currentFlagIndex].setVisible(true);
        });

        buttonRight2.setInteractive({ cursor: 'pointer' });
        buttonLeft2.setInteractive({ cursor: 'pointer' });

        const updateVolumeBar = () => {
            volumeBar.width = (volume / 100) * 150; 
        };

        buttonRight2.on('pointerdown', () => {
            if (volume < 100) {
                volume += 10;
                updateVolumeBar();
            }
        });

        buttonLeft2.on('pointerdown', () => {
            if (volume > 0) {
                volume -= 10;
                updateVolumeBar();
            }
        });

        buttonRight3.setInteractive({ cursor: 'pointer' });
        buttonLeft3.setInteractive({ cursor: 'pointer' });

        buttonRight3.on('pointerdown', () => {
            if (this.scale.isFullscreen) {
                this.scale.stopFullscreen();
                Fullscreen.setText('Completa');
            } else {
                this.scale.startFullscreen();
                Fullscreen.setText('Minimizar');
            }
        });

        buttonLeft3.on('pointerdown', () => {
            if (this.scale.isFullscreen) {
                this.scale.stopFullscreen();
                Fullscreen.setText('Completa');
            } else {
                this.scale.startFullscreen();
                Fullscreen.setText('Minimizar');
            }
        });

        buttonBack.setInteractive({ cursor: 'pointer' });

        buttonBack.on('pointerdown', () => {
            this.scene.start('MainMenu');
        });

    }
}
