import { Scene } from 'phaser';
import { getTranslations, getPhrase } from '../service/translations';

const ES_AR = 'es-AR';
const EN_US = 'en-US';
const PT_BR = 'pt-BR';

export class Config extends Scene {
    #wasChangedLanguage = 'NOT_FETCHED';

    constructor() {
        super('Config');
    }

    init() {
        this.volume = localStorage.getItem('gameVolume') ? parseInt(localStorage.getItem('gameVolume'), 10) : 100;

        if (!this.TrackConfig || !this.TrackConfig.isPlaying) {
            this.TrackConfig = this.sound.add('TrackConfig', { volume: this.volume / 100, loop: true });
            this.TrackConfig.play();
        } else if (this.TrackConfig.isPaused) {
            this.TrackConfig.resume();
        }        

        this.TrackMenu = this.scene.get('MainMenu').TrackMenu;
        this.TrackGame = this.scene.get('Vs').TrackGame;
        this.TrackGame = this.scene.get('Coop').TrackGame;

        this.setGlobalVolume(this.volume);
    }

    setGlobalVolume(volume) {
        if (this.TrackConfig) this.TrackConfig.setVolume(volume / 100);
        if (this.TrackMenu) this.TrackMenu.setVolume(volume / 100);
        if (this.TrackGame) this.TrackGame.setVolume(volume / 100);
    }

    create() {
        this.add.image(960, 540, 'fondomenu');

        let volume = this.volume;

        this.obtenerTraducciones(ES_AR);

        this.idioma = this.add.text(960, 270, getPhrase('Idioma'), {
            fontFamily: 'Cooper Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        const flags = [
            { lang: ES_AR, img: this.add.image(960, 370, 'Argentina').setScale(0.5) },
            { lang: EN_US, img: this.add.image(960, 370, 'EEUU').setScale(0.1).setVisible(false) },
            { lang: PT_BR, img: this.add.image(960, 370, 'Brasil').setScale(0.3).setVisible(false) }
        ];
        let currentFlagIndex = 0;

        this.sonido = this.add.text(960, 540, getPhrase('Sonido'), {
            fontFamily: 'Cooper Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        const volumeBarBg = this.add.rectangle(960, 640, 150, 20, 0x888888);
        const volumeBar = this.add.rectangle(885, 640, (volume / 100) * 150, 20, 0xffffff).setOrigin(0, 0.5);

        this.pantalla = this.add.text(960, 810, getPhrase('Pantalla'), {
            fontFamily: 'Cooper Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        this.Fullscreen = this.add.text(960, 910, getPhrase('Completa'), {
            fontFamily: 'Cooper Black', fontSize: 32, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        this.buttonBack = this.add.text(80, 1040, getPhrase('Atras'), {
            fontFamily: 'Cooper Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        const buttonRight = this.add.image(1160, 370, 'triangle').setScale(0.1);
        const buttonLeft = this.add.image(760, 370, 'triangle').setScale(0.1).setAngle(180);

        const buttonRight2 = this.add.image(1160, 640, 'triangle').setScale(0.1);
        const buttonLeft2 = this.add.image(760, 640, 'triangle').setScale(0.1).setAngle(180);

        const buttonRight3 = this.add.image(1160, 910, 'triangle').setScale(0.1);
        const buttonLeft3 = this.add.image(760, 910, 'triangle').setScale(0.1).setAngle(180);

        buttonRight.setInteractive({ cursor: 'pointer' });
        buttonLeft.setInteractive({ cursor: 'pointer' });

        buttonRight.on('pointerdown', () => {
            flags[currentFlagIndex].img.setVisible(false);
            currentFlagIndex = (currentFlagIndex + 1) % flags.length;
            flags[currentFlagIndex].img.setVisible(true);
            this.obtenerTraducciones(flags[currentFlagIndex].lang);
        });

        buttonLeft.on('pointerdown', () => {
            flags[currentFlagIndex].img.setVisible(false);
            currentFlagIndex = (currentFlagIndex - 1 + flags.length) % flags.length;
            flags[currentFlagIndex].img.setVisible(true);
            this.obtenerTraducciones(flags[currentFlagIndex].lang);
        });

        buttonRight2.setInteractive({ cursor: 'pointer' });
        buttonLeft2.setInteractive({ cursor: 'pointer' });

        const updateVolumeBar = () => {
            volumeBar.width = (volume / 100) * 150;
            this.setGlobalVolume(volume); 
            localStorage.setItem('gameVolume', volume);
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
                this.Fullscreen.setText(getPhrase('Completa'));
            } else {
                this.scale.startFullscreen();
                this.Fullscreen.setText(getPhrase('Minimizar'));
            }
        });

        buttonLeft3.on('pointerdown', () => {
            if (this.scale.isFullscreen) {
                this.scale.stopFullscreen();
                this.Fullscreen.setText(getPhrase('Completa'));
            } else {
                this.scale.startFullscreen();
                this.Fullscreen.setText(getPhrase('Minimizar'));
            }
        });

        this.buttonBack.setInteractive({ cursor: 'pointer' });

        this.buttonBack.on('pointerdown', () => {
            this.TrackConfig.pause();
            this.scene.start('MainMenu');
        });
    }

    update() {
        if (this.#wasChangedLanguage === 'FETCHED') {
            this.#wasChangedLanguage = 'NOT_FETCHED';
            this.idioma.setText(getPhrase('Idioma'));
            this.sonido.setText(getPhrase('Sonido'));
            this.pantalla.setText(getPhrase('Pantalla'));
            this.Fullscreen.setText(getPhrase('Completa'));
            this.Fullscreen.setText(getPhrase('Minimizar'));
            this.buttonBack.setText(getPhrase('Atras'));
        }
    }

    updateWasChangedLanguage = () => {
        this.#wasChangedLanguage = 'FETCHED';
    };

    async obtenerTraducciones(language) {
        this.language = language;
        this.#wasChangedLanguage = 'FETCHING';
        await getTranslations(language, this.updateWasChangedLanguage);
    }
}
