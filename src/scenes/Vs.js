import { Scene } from 'phaser';
import { InputManager } from '../Components/InputManager'; 
import { inputConfigs } from '../utils/inputConfigs'; 

export class Vs extends Scene {
    constructor() {
        super('Vs');
        this.gameDuration = 60000; 
    }

    create() {
        this.timeRemaining = this.gameDuration / 1000; 

        this.cameras.main.setBackgroundColor(0x00ff00);
        this.add.image(512, 384, 'background').setAlpha(0.5);
 
        this.ground = this.physics.add.staticGroup();
        this.ground.add(this.physics.add.staticImage(512, 750, 'negro').setDisplaySize(1024, 50).setOrigin(0.5, 0.5).refreshBody()); 
        this.ground.add(this.physics.add.staticImage(512, 300, 'negro').setDisplaySize(350, 30).setOrigin(0.5, 0.5).refreshBody());  
        this.ground.add(this.physics.add.staticImage(0, 500, 'negro').setDisplaySize(250, 30).setOrigin(0.5, 0.5).refreshBody());    
        this.ground.add(this.physics.add.staticImage(1024, 500, 'negro').setDisplaySize(250, 30).setOrigin(0.5, 0.5).refreshBody()); 

        this.player1 = this.physics.add.sprite(100, 660, 'player').setScale(0.5);
        this.player1.setCollideWorldBounds(true);
        this.player1.setGravityY(300);

        this.player2 = this.physics.add.sprite(300, 660, 'player').setScale(0.5);
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
            repeat:0  
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

        const buttonBack = this.add.text(80, 20, 'Back', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        buttonBack.setInteractive({ cursor: 'pointer' });

        buttonBack.on('pointerdown', () => {
            this.scene.start('MainMenu');
        });

        this.fallingObjects = this.physics.add.group({
            defaultKey: 'fallingObject',
            runChildUpdate: true
        });

        this.time.addEvent({
            delay: 5000, 
            callback: this.spawnFallingObject,
            callbackScope: this,
            loop: true
        });

        this.physics.add.overlap(this.player1, this.fallingObjects, this.collectObject, null, this);
        this.physics.add.overlap(this.player2, this.fallingObjects, this.collectObject, null, this);

        this.physics.add.collider(this.fallingObjects, this.ground);

        this.ground.children.iterate(child => {
            child.refreshBody();
        });

        this.physics.world.setBoundsCollision(true, true, true, true);

        this.timerText = this.add.text(924, 50, `Time: ${this.timeRemaining}`, {
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
        const objectType = Phaser.Math.Between(0, 2); 
        const xPosition = Phaser.Math.Between(50, 974); 
        let fallingObject;

        if (objectType === 0) {
            fallingObject = this.physics.add.sprite(xPosition, 0, 'gun').setScale(0.1);
            fallingObject.isHarmful = false;
            fallingObject.setBounce(0);
        } else if (objectType === 1) {
            fallingObject = this.physics.add.sprite(xPosition, 0, 'spade').setScale(0.3);
            fallingObject.isHarmful = false; 
            fallingObject.setBounce(0); 
        } else {
            fallingObject = this.physics.add.sprite(xPosition, 0, 'bomb').setScale(0.3);
            fallingObject.isHarmful = true; 
            fallingObject.setBounce(5); 
        }

        fallingObject.setGravityY(200); 
        fallingObject.setCollideWorldBounds(true);
        fallingObject.body.onWorldBounds = true; 
        this.fallingObjects.add(fallingObject); 

        this.physics.add.collider(fallingObject, this.ground, () => {
            console.log('Bomba colisionó con el suelo o plataforma');
        });
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
