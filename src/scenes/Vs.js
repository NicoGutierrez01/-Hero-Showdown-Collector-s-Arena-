import { Scene } from 'phaser';
import { InputManager } from '../Components/InputManager'; 
import { inputConfigs } from '../utils/inputConfigs';
import { Bomb } from '../Objects/Bomb';
import { getPhrase } from '../service/translations';

export class Vs extends Scene {
    constructor() {
        super('Vs');
        this.gameDuration = 150000; 
        this.player1Score = 0;
        this.player2Score = 0;
        this.gameOver = false;
        this.baseTexture = "spade";
    }
    
    init(data){
        this.player1texture = data.player1;
        this.player2texture = data.player2;
    }

    create() {
        this.anims.remove('walk');
        this.anims.remove('idle');
        this.anims.remove('jump');
        this.anims.remove('action');


        this.timeRemaining = this.gameDuration / 1000; 

        this.player1CanAttack = true;  
        this.player2CanAttack = true;  

        const minutes = Math.floor(this.timeRemaining / 60);
        const seconds = this.timeRemaining % 60;
        const formattedTime = `${minutes}:${seconds.toString().padStart(2, '0')}`;

        this.add.image(960, 540, 'fondovs');

        this.physics.add.staticImage(960, 1080, 'negro').setDisplaySize(1920, 50).setOrigin(0.5, 0.5).refreshBody(); 
        this.ground = this.physics.add.staticGroup();
        
        this.ground.add(this.physics.add.staticImage(960, 540, 'negro').setDisplaySize(350, 30).setOrigin(0.5, 0.5).refreshBody());  
        this.ground.add(this.physics.add.staticImage(200, 810, 'negro').setDisplaySize(400, 30).setOrigin(0.5, 0.5).refreshBody());    
        this.ground.add(this.physics.add.staticImage(1720, 810, 'negro').setDisplaySize(400, 30).setOrigin(0.5, 0.5).refreshBody()); 
        this.ground.add(this.physics.add.staticImage(200, 270, 'negro').setDisplaySize(400, 30).setOrigin(0.5, 0.5).refreshBody()); 
        this.ground.add(this.physics.add.staticImage(1720, 270, 'negro').setDisplaySize(400, 30).setOrigin(0.5, 0.5).refreshBody()); 

        this.player1 = this.physics.add.sprite(480, 1000, this.player1texture).setScale(0.7);
        this.player1.setCollideWorldBounds(true);
        this.player1.setGravityY(300);

        this.player2 = this.physics.add.sprite(1440, 1000, this.player2texture).setScale(0.7);
        this.player2.setCollideWorldBounds(true);
        this.player2.setGravityY(300);

        this.physics.add.collider(this.player1, this.ground);
        this.physics.add.collider(this.player2, this.ground);        

        this.anims.create({
            key: 'walk-1',
            frames: this.anims.generateFrameNumbers(`${this.player1texture}${this.baseTexture}`, { start: 0, end: 7 }),
            frameRate: 20,
            repeat: 0
        });

        this.anims.create({
            key: 'idle-1',
            frames: this.anims.generateFrameNumbers(`${this.player1texture}${this.baseTexture}`, { start: 8, end: 13 }),
            frameRate: 12,
            repeat: 0
        });

        this.anims.create({
            key: 'jump-1',
            frames: this.anims.generateFrameNumbers(`${this.player1texture}${this.baseTexture}`, { start: 14, end: 17 }),
            frameRate: 4, 
            repeat: 0  
        });

        this.anims.create({
            key: 'action-1',
            frames: this.anims.generateFrameNumbers(`${this.player1texture}${this.baseTexture}`, { start: 18, end: 30 }),
            frameRate: 15, 
            repeat: 0  
        });

        this.anims.create({
            key: 'walk-2',
            frames: this.anims.generateFrameNumbers(`${this.player2texture}${this.baseTexture}`, { start: 0, end: 7 }),
            frameRate: 20,
            repeat: 0
        });

        this.anims.create({
            key: 'idle-2',
            frames: this.anims.generateFrameNumbers(`${this.player2texture}${this.baseTexture}`, { start: 8, end: 13 }),
            frameRate: 12,
            repeat: 0
        });

        this.anims.create({
            key: 'jump-2',
            frames: this.anims.generateFrameNumbers(`${this.player2texture}${this.baseTexture}`, { start: 14, end: 17 }),
            frameRate: 4, 
            repeat: 0  
        });

        this.anims.create({
            key: 'action-2',
            frames: this.anims.generateFrameNumbers(`${this.player2texture}${this.baseTexture}`, { start: 18, end: 30 }),
            frameRate: 15, 
            repeat: 0  
        });


        const config = {
            key: 'explode',
            frames: this.anims.generateFrameNumbers('bomb', { start: 0, end: 11 }),
            frameRate: 10,
            repeat: 0
        };

        this.anims.create(config);
        

        this.inputManagerPlayer1 = new InputManager({
            scene: this,
            inputConfig: inputConfigs.wasd,  
            callbacks: {
                up: () => this.movePlayer(this.player1, 'up'),
                down: () => this.movePlayer(this.player1, 'down'),
                left: () => this.movePlayer(this.player1, 'left'),
                right: () => this.movePlayer(this.player1, 'right'),
                action: () => this.attackPlayer(this.player1, this.player2, this.player1CanAttack),
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
                action: () => this.attackPlayer(this.player2, this.player1, this.player2CanAttack),
                stop: () => this.stopPlayer(this.player2)
            }
        });

        this.fallingObjects = this.physics.add.group();

        this.time.addEvent({
            delay: 15000, 
            callback: this.spawnFallingObject,
            callbackScope: this,
            loop: true
        });

        this.physics.add.overlap(this.player1, this.fallingObjects, this.collectObject, null, this);
        this.physics.add.overlap(this.player2, this.fallingObjects, this.collectObject, null, this);

        this.physics.add.collider(this.spawnFallingObject, this.ground);

        this.physics.world.setBoundsCollision(true, true, true, true);

        this.timerText = this.add.text(960, 50, formattedTime, {
            fontFamily: 'Arial', fontSize: 38, color: '#ffffff', align: 'center'
        }).setOrigin(0.5);

        this.player1ScoreText = this.add.text(620, 50, getPhrase('Jugador 1 :'),{
            fontFamily: 'Arial', fontSize: 38, color: '#ffffff', align: 'center'
        }).setOrigin(0.5);

        this.player2ScoreText = this.add.text(1300, 50, getPhrase('Jugador 2 :'),{
            fontFamily: 'Arial', fontSize: 38, color: '#ffffff', align: 'center'
        }).setOrigin(0.5);

        this.time.addEvent({
            delay: 1000, 
            callback: this.updateTimer,
            callbackScope: this,
            loop: true
        });

        this.time.delayedCall(this.gameDuration, () => {
            this.scene.start('GameOver', {
                player1Score: this.player1Score,
                player2Score: this.player2Score
            });
        });

        this.physics.world.setBoundsCollision(true, true, true, true);

    }

    updateTimer() {
        this.timeRemaining--;
    
        const minutes = Math.floor(this.timeRemaining / 60);
        const seconds = this.timeRemaining % 60;
    
        const formattedTime = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    
        this.timerText.setText(formattedTime);
    
        if (this.timeRemaining <= 0) {
            this.timerText.setText('0:00');
        }
    }
    
    movePlayer(player, direction) {
        const speed = 400;
        const jumpVelocity = -500;

        if (direction === 'left') {
            player.setVelocityX(-speed);
            player.anims.play(`walk-${player.number}`, true);
            player.flipX = true;
        } else if (direction === 'right') {
            player.setVelocityX(speed);
            player.anims.play(`walk-${player.number}`, true);
            player.flipX = false;
        } else if (direction === 'up' && player.body.onFloor()) {
            player.setVelocityY(jumpVelocity);
            player.anims.play(`jump-${player.number}`, true);
        } else if (direction === 'down') {
            player.setVelocityY(speed);
        } else if (direction === 'action') {
            player.setVelocityX(0);
            player.anims.play(`action-${player.number}`, true);
        }
    }

    stopPlayer(player) {
        player.setVelocityX(0);
        player.on('animationcomplete', () => {
            player.anims.play(`idle-${player.number}`, true);
            console.log("aca")
        });
    }

    attackPlayer(attacker, defender, attackerCanAttackFlag) {
        const distance = Phaser.Math.Distance.Between(attacker.x, attacker.y, defender.x, defender.y);
    
        attacker.anims.play(`action-${player.number}`); 
        if (distance < 100 && attackerCanAttackFlag) {  

    
            const damage = Phaser.Math.Between(5, 15); 
            if (attacker === this.player1 && this.player1CanAttack) {
                this.player1Score += damage;
                this.player1ScoreText.setText(getPhrase(`Jugador 1: ${this.player1Score}`));
                this.player1CanAttack = false;  
            } else if (attacker === this.player2 && this.player2CanAttack) {
                this.player2Score += damage;
                this.player2ScoreText.setText(getPhrase(`Jugador 2: ${this.player2Score}`));
                this.player2CanAttack = false;  
            }
    
            defender.setTint(0xff0000); 
            this.time.delayedCall(500, () => defender.clearTint()); 
        }
    }
    
    spawnFallingObject() {
        const xPosition = Phaser.Math.Between(50, 974); 

        let object;
        let callback;

            object = new Bomb(this, xPosition, 0).setScale(0.4);
        
            object.hasCollided = false;
            
            this.physics.add.overlap(object, this.player1, () => {
                if (!object.hasCollided) {  
                    object.hasCollided = true;  
        
                    object.play('explode');
                    this.player1Score -= 10;  
                    this.player1ScoreText.setText(getPhrase(`Jugador 1: ${this.player1Score}`));
        
                    object.on('animationcomplete', () => {
                        object.destroy();
                    });
                }
            });
        
            this.physics.add.overlap(object, this.player2, () => {
                if (!object.hasCollided) {  
                    object.hasCollided = true;
        
                    object.play('explode');
                    this.player2Score -= 10;  
                    this.player2ScoreText.setText(getPhrase(`Jugador 2: ${this.player2Score}`));
        
                    object.on('animationcomplete', () => {
                        object.destroy();
                    });
                }
            });

        this.physics.add.collider(object, this.ground, callback, null, this);
    }
}