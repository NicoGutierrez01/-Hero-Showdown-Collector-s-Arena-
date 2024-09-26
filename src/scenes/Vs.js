import { Scene } from 'phaser';
import { InputManager } from '../Components/InputManager'; 
import { inputConfigs } from '../utils/inputConfigs';
import { Bomb } from '../Objects/Bomb';
import { Gun } from '../Objects/Gun';
import { Spade } from '../Objects/Spade';

export class Vs extends Scene {
    constructor() {
        super('Vs');
        this.gameDuration = 60000; 
    }

    create() {
        this.timeRemaining = this.gameDuration / 1000; 

        this.cameras.main.setBackgroundColor(0x00ff00);
        this.add.image(960, 540, 'background').setAlpha(0.5).setScale(2.7);


        this.physics.add.staticImage(960, 1080, 'negro').setDisplaySize(1920, 50).setOrigin(0.5, 0.5).refreshBody(); 
        this.ground = this.physics.add.staticGroup();
        
        this.ground.add(this.physics.add.staticImage(960, 540, 'negro').setDisplaySize(350, 30).setOrigin(0.5, 0.5).refreshBody());  
        this.ground.add(this.physics.add.staticImage(200, 810, 'negro').setDisplaySize(400, 30).setOrigin(0.5, 0.5).refreshBody());    
        this.ground.add(this.physics.add.staticImage(1720, 810, 'negro').setDisplaySize(400, 30).setOrigin(0.5, 0.5).refreshBody()); 
        this.ground.add(this.physics.add.staticImage(200, 270, 'negro').setDisplaySize(400, 30).setOrigin(0.5, 0.5).refreshBody()); 
        this.ground.add(this.physics.add.staticImage(1720, 270, 'negro').setDisplaySize(400, 30).setOrigin(0.5, 0.5).refreshBody()); 

        this.player1 = this.physics.add.sprite(480, 1000, 'player').setScale(0.5);
        this.player1.setCollideWorldBounds(true);
        this.player1.setGravityY(300);

        this.player2 = this.physics.add.sprite(1440, 1000, 'player').setScale(0.5);
        this.player2.setCollideWorldBounds(true);
        this.player2.setGravityY(300);

        this.physics.add.collider(this.player1, this.ground);
        this.physics.add.collider(this.player2, this.ground);        

        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 7 }),
            frameRate: 20,
            repeat: -1
        });

        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('player', { start: 8, end: 13 }),
            frameRate: 12,
            repeat: -1
        });
        this.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNumbers('player', { start: 14, end: 17 }),
            frameRate: 8, 
            repeat: 0  
        });

        this.inputManagerPlayer1 = new InputManager({
            scene: this,
            inputConfig: inputConfigs.wasd,  
            callbacks: {
                up: () => this.movePlayer(this.player1, 'up'),
                down: () => this.movePlayer(this.player1, 'down'),
                left: () => this.movePlayer(this.player1, 'left'),
                right: () => this.movePlayer(this.player1, 'right'),
                action: () => this.movePlayer(this.player1, 'action'),
                stop: () => this.stopPlayer(this.player1)
            }
        });

        this.inputManagerPlayer2 = new InputManager({
            scene: this,
            inputConfig: inputConfigs.defaultInputConfigs,  
            callbacks: {
                up: () => this.movePlayer(this.player2, 'up'),
                down: () => this.movePlayer(this.player2, 'down'),
                left: () => this.movePlayer(this.player2, 'left'),
                right: () => this.movePlayer(this.player2, 'right'),
                action: () => this.movePlayer(this.player2, 'action'),
                stop: () => this.stopPlayer(this.player2)
            }
        });

        const buttonBack = this.add.text(80, 40, 'Back', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        buttonBack.setInteractive({ cursor: 'pointer' });

        buttonBack.on('pointerdown', () => {
            this.scene.start('MainMenu');
        });

        this.fallingObjects = this.physics.add.group();

        this.time.addEvent({
            delay: 5000, 
            callback: this.spawnFallingObject,
            callbackScope: this,
            loop: true
        });

        this.physics.add.overlap(this.player1, this.fallingObjects, this.collectObject, null, this);
        this.physics.add.overlap(this.player2, this.fallingObjects, this.collectObject, null, this);

        this.physics.add.collider(this.spawnFallingObject, this.ground);

        this.physics.world.setBoundsCollision(true, true, true, true);

        this.timerText = this.add.text(1800, 50, `Time: ${this.timeRemaining}`, {
            fontFamily: 'Arial', fontSize: 38, color: '#ffffff', align: 'center'
        }).setOrigin(0.5);

        this.time.addEvent({
            delay: 1000, 
            callback: this.updateTimer,
            callbackScope: this,
            loop: true
        });

        this.time.delayedCall(this.gameDuration, () => {
            this.scene.start('GameOver');
        });

    }

    updateTimer() {
        this.timeRemaining--;
        this.timerText.setText(`Time: ${this.timeRemaining}`);

        if (this.timeRemaining <= 0) {
            this.timerText.setText('Time: 0');
        }
    }

    movePlayer(player, direction) {
        const speed = 400;
        const jumpVelocity = -600;

        if (direction === 'left') {
            player.setVelocityX(-speed);
            player.anims.play('walk', true);
            player.flipX = true;
        } else if (direction === 'right') {
            player.setVelocityX(speed);
            player.anims.play('walk', true);
            player.flipX = false;
        } else if (direction === 'up' && player.body.onFloor()) {
            player.setVelocityY(jumpVelocity);
            player.anims.play('jump');
        } else if (direction === 'down') {
            player.setVelocityY(speed);
        }
    }

    stopPlayer(player) {
        player.setVelocityX(0);
        player.anims.play('idle', true);
    }

    spawnFallingObject() {
        const xPosition = Phaser.Math.Between(50, 974); 

        // obtener un numero random del 1 al 3
        let element = Phaser.Math.Between(1, 3);
        let object
        let callback

        if (element == 1) {
            object = new Bomb(this, xPosition, 0).setScale(0.3);
            callback = () => {
                //console.log('recolecte bomb')
            }
        }
        if (element == 2) {
            object = new Gun(this, xPosition, 0).setScale(0.1);
            callback = () => {
                //console.log('recolecte gun')
            }
        }
        if (element == 3) {
            object = new Spade(this, xPosition, 0).setScale(0.3); 
            callback = () => {
                //console.log('recolecte spade')
            }
        }

        //collider entre player y object, y ejecuta callback

        // que el objecto colisiones con las plataformas
        this.physics.add.collider(object, this.ground, callback, null, this)
        

       
    
    }
    
    collectObject(player, object) {
        if (object.isHarmful) {
            player.setTint(0xff0000);
            this.time.delayedCall(500, () => player.clearTint()); 
        } else {
            object.destroy(); 
        }
    }
}