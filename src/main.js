import { Boot } from './scenes/Boot';
import { Game } from './scenes/Game';
import { GameOver } from './scenes/GameOver';
import { MainMenu } from './scenes/MainMenu';
import { Preloader } from './scenes/Preloader';
import { Characters } from './scenes/Characters'
import { Inicio } from './scenes/Inicio';
import { Vs } from './scenes/Vs';
import { Coop } from './scenes/Coop';
import { Mode } from './scenes/Mode';
import { Config } from './scenes/Config';
import { Credits } from './scenes/Credits';

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 768,
    parent: 'game-container',
    backgroundColor: '#028af8',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 0 },
          debug: false,
        },
    },
    scene: [
        Boot,
        Preloader,
        MainMenu,
        Game,
        GameOver,
        Characters,
        Inicio,
        Mode,
        Vs,
        Coop,
        Config,
        Credits
        
    ]
};

export default new Phaser.Game(config);
