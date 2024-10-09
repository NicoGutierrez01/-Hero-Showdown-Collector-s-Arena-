import { Scene } from 'phaser';
import { InputManager } from '../Components/InputManager'; 
import { inputConfigs } from '../utils/inputConfigs';
import { Bomb } from '../Objects/Bomb';
import { Gun } from '../Objects/Gun';
import { Spade } from '../Objects/Spade';

export class Vs extends Scene {
    constructor() {
        super('Vs');
        this.gameDuration = 150000; 
        this.player1Score = 0;
        this.player2Score = 0;
        this.gameOver = false;
    }
    
    init(data){
        this.player1texture = data.player1;
        this.player2texture = data.player2;
    }

    create() {
        this.timeRemaining = this.gameDuration / 1000; 

        this.player1CanAttack = true;  
        this.player2CanAttack = true;  

        const minutes = Math.floor(this.timeRemaining / 60);
        const seconds = this.timeRemaining % 60;
        const formattedTime = `${minutes}:${seconds.toString().padStart(2, '0')}`;

        this.add.image(960, 540, 'fondonivel');

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
            key: 'walk',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 7 }),
            frameRate: 20,
            repeat: 0
        });

        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('player', { start: 8, end: 13 }),
            frameRate: 12,
            repeat: 0
        });
        this.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNumbers('player', { start: 14, end: 17 }),
            frameRate: 4, 
            repeat: 0  
        });
        this.anims.create({
            key: 'action',
            frames: this.anims.generateFrameNumbers('player', { start: 18, end: 30 }),
            frameRate: 30, 
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

        const buttonBack = this.add.text(80, 40, 'Atras', {
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

        this.player1ScoreText = this.add.text(620, 50, 'Jugador 1 :',{
            fontFamily: 'Arial', fontSize: 38, color: '#ffffff', align: 'center'
        }).setOrigin(0.5);

        this.player2ScoreText = this.add.text(1300, 50, 'Jugador 2 :',{
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
            player.anims.play('walk', true);
            player.flipX = true;
        } else if (direction === 'right') {
            player.setVelocityX(speed);
            player.anims.play('walk', true);
            player.flipX = false;
        } else if (direction === 'up' && player.body.onFloor()) {
            player.setVelocityY(jumpVelocity);
            player.anims.play('jump', true);
        } else if (direction === 'down') {
            player.setVelocityY(speed);
        } else if (direction === 'action') {
            player.setVelocityX(0);
            player.anims.play('action', true);
        }
    }

    stopPlayer(player) {
        player.setVelocityX(0);
        player.on('animationcomplete', () => {
            player.anims.play('idle', true);
            console.log("aca")
        });
    }

    attackPlayer(attacker, defender, attackerCanAttackFlag) {
        const distance = Phaser.Math.Distance.Between(attacker.x, attacker.y, defender.x, defender.y);
    
        attacker.anims.play('action'); 
        // Solo permite el ataque si la bandera de ataque está habilitada
        if (distance < 100 && attackerCanAttackFlag) {  

    
            const damage = Phaser.Math.Between(5, 15); 
            if (attacker === this.player1 && this.player1CanAttack) {
                this.player1Score += damage;
                this.player1ScoreText.setText(`Jugador 1: ${this.player1Score}`);
                this.player1CanAttack = false;  // Desactiva el ataque para jugador 1
            } else if (attacker === this.player2 && this.player2CanAttack) {
                this.player2Score += damage;
                this.player2ScoreText.setText(`Jugador 2: ${this.player2Score}`);
                this.player2CanAttack = false;  // Desactiva el ataque para jugador 2
            }
    
            defender.setTint(0xff0000); 
            this.time.delayedCall(500, () => defender.clearTint()); 
        }
    }
    
    spawnFallingObject() {
        const xPosition = Phaser.Math.Between(50, 974); 

        let element = Phaser.Math.Between(1, 3);
        let object;
        let callback;

        if (element === 1) {
            object = new Bomb(this, xPosition, 0).setScale(0.4);
        
            // Inicializa la bandera de colisión
            object.hasCollided = false;
            
            // Detectar colisión entre la bomba y el jugador 1
            this.physics.add.overlap(object, this.player1, () => {
                if (!object.hasCollided) {  // Verifica si ya ha colisionado
                    object.hasCollided = true;  // Marca como colisionada
        
                    // Iniciar animación de explosión y actualizar puntaje
                    object.play('explode');
                    this.player1Score -= 10;  // Jugador 1 pierde puntos
                    this.player1ScoreText.setText(`Juagador 1: ${this.player1Score}`);
        
                    // Esperar a que termine la animación antes de destruir la bomba
                    object.on('animationcomplete', () => {
                        object.destroy();
                    });
                }
            });
        
            // Detectar colisión entre la bomba y el jugador 2
            this.physics.add.overlap(object, this.player2, () => {
                if (!object.hasCollided) {  // Verifica si ya ha colisionado
                    object.hasCollided = true;  // Marca como colisionada
        
                    // Iniciar animación de explosión y actualizar puntaje
                    object.play('explode');
                    this.player2Score -= 10;  // Jugador 2 pierde puntos
                    this.player2ScoreText.setText(`Jugador 2: ${this.player2Score}`);
        
                    // Esperar a que termine la animación antes de destruir la bomba
                    object.on('animationcomplete', () => {
                        object.destroy();
                    });
                }
            });
        }
                
        if (element === 2) {
            object = new Gun(this, xPosition, 0).setScale(0.15);       
            this.physics.add.overlap(object, this.player1, () => {
                // Acción cuando el jugador colisiona con el arma y la recoge
                object.destroy(); // Elimina el objeto del mundo 
            });
        
            this.physics.add.overlap(object, this.player2, () => {
                // Acción cuando el jugador colisiona con el arma y la recoge
                object.destroy(); // Elimina el objeto del mundo 
            });
        }
        
        if (element === 3) {
            object = new Spade(this, xPosition, 0).setScale(0.1); 
            this.physics.add.overlap(object, this.player1, () => {
                // Acción cuando el jugador colisiona con la pala y la recoge
                object.destroy(); // Elimina el objeto del mundo 
            });
        
            this.physics.add.overlap(object, this.player2, () => {
                // Acción cuando el jugador colisiona con la pala y la recoge
                object.destroy(); // Elimina el objeto del mundo 
            });

            callback = () => {
                // Acciones después de que la pala colisione
            };
        }

        this.physics.add.collider(object, this.ground, callback, null, this);
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