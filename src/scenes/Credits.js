import { Scene } from 'phaser';
import { getPhrase } from '../service/translations';

export class Credits extends Scene
{
    constructor ()
    {
        super('Credits');
    }

    create() {
        this.add.image(960, 540, 'fondomenu');
    
        const creditsText = [
            "HERO SHOWDOWN",

            "GAGLE GAMES",

            "EQUIPO DE DESARROLLO:",

            "PROGRAMADOR: Nicolas Gutierrez",

            "ARTISTA: Santiago Acevedo",

            "ORQUESTA: Patricio Giussani",

            "COLABORADORES:",

            "Sebastian Nazzetta",

            "Nicolas Nocete",

            "Federico Degiovanni",

            "MÚSICA:",

            "Brian Scarafia",

            "MENCIÓN ESPECIAL A QUIENES PRESTARON SUS PERSONAJES:",

            "Lorenzo Buffo: Machine Hierro",

            "Martin Dib: Shelly",

            "Pabloe Bertoni: Pez Jaime",



            "Gagle Games® 2024"
        ];
    
        const creditsContainer = this.add.container(960, 1080);
    
        creditsText.forEach((text, index) => {
            const creditLine = this.add.text(0, index * 70, text, {
                fontFamily: 'Arial Black', fontSize: 40, color: '#ffffff',
                stroke: '#000000', strokeThickness: 3,
                align: 'center'
            }).setOrigin(0.5);
            creditsContainer.add(creditLine);
        });
    
        this.tweens.add({
            targets: creditsContainer,
            y: -creditsText.length * 70, 
            duration: 20000,             
            ease: 'Linear',
            repeat: -1,              
            onRepeat: () => {
                creditsContainer.y = 1080;
            }
        });

        const buttonBack = this.add.text(80, 1040, getPhrase('Atras'), {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);
    
        buttonBack.setInteractive({ cursor: 'pointer' });
        buttonBack.on('pointerdown', () => {
            this.scene.start('MainMenu');
        });
    }
}