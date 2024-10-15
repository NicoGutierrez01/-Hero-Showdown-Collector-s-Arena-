import { Scene } from 'phaser';
import { InputManager } from '../Components/InputManager'; 
import { inputConfigs } from '../utils/inputConfigs';
import { Bomb } from '../Objects/Bomb';
import { Jawa } from '../Objects/Jawas';
import { Bullet } from '../Objects/Bullet';


export class Coop extends Scene {
    constructor() {
        super('Coop');
        this.player1Score = 0;
        this.player2Score = 0;
        this.gameOver = false;
        this.jawaGroup = null; 
    }
    
    init(data) {
        this.player1texture = data.player1;
        this.player2texture = data.player2;
    }

    create() {
        this.anims.remove('walk');
        this.anims.remove('idle');
        this.anims.remove('jump');
        this.anims.remove('action');
        this.player1CanAttack = true;  
        this.player2CanAttack = true;  

        this.jawaGroup = this.physics.add.group({
            runChildUpdate: true  
        });
        


        this.add.image(960, 540, 'fondonivel');
        this.devil = this.add.image(512, 100, 'devil').setScale(0.36);

        this.tweens.add({
            targets: this.devil,
            x: { from: 250, to: 1670 }, 
            duration: 4000, 
            ease: 'Linear', 
            yoyo: true, 
            repeat: -1 
        });

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
            frames: this.anims.generateFrameNumbers('playergun', { start: 0, end: 7 }),
            frameRate: 20,
            repeat: 0
        });

        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('playergun', { start: 8, end: 13 }),
            frameRate: 12,
            repeat: 0
        });

        this.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNumbers('playergun', { start: 14, end: 17 }),
            frameRate: 4, 
            repeat: 0  
        });

        this.anims.create({
            key: 'action',
            frames: this.anims.generateFrameNumbers('playergun', { start: 18, end: 30 }),
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

        // Hacer que el jefe spawnee oleadas de Jawas
        this.time.addEvent({
            delay: 10000, // 10 segundos entre oleadas
            callback: this.spawnJawaWave,
            callbackScope: this,
            loop: true
        });

        // Colisiones entre Jawas y el suelo
        this.physics.add.collider(this.spawnJawaWave, this.ground);
    }

    update() {
        this.jawaGroup.children.iterate(jawa => {
            jawa.followPlayer(this.player1, this.player2);
        });
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
        });
    }

    spawnFallingObject() {
        const xPosition = Phaser.Math.Between(50, 974); 

        let element = Phaser.Math.Between(1, 1);
        let object;

        if (element === 1) {
            object = new Bomb(this, xPosition, 0).setScale(0.4);
        
            object.hasCollided = false;
            
            this.physics.add.overlap(object, this.player1, () => {
                if (!object.hasCollided) {
                    object.hasCollided = true;
                    object.play('explode');      
                    object.on('animationcomplete', () => {
                        object.destroy();
                    });
                }
            });

            this.physics.add.overlap(object, this.player2, () => {
                if (!object.hasCollided) {
                    object.hasCollided = true;
                    object.play('explode');  
                    object.on('animationcomplete', () => {
                        object.destroy();
                    });
                }
            });
        }

        this.physics.add.collider(object, this.ground);
    }
    
    collectObject(player, object) {
        if (object.isHarmful) {
            player.setTint(0xff0000);
            this.time.delayedCall(500, () => player.clearTint()); 
        } else {
            object.destroy(); 
        }
    }

    spawnJawaWave() {
        const numJawas = Phaser.Math.Between(3, 6); 
    
        for (let i = 0; i < numJawas; i++) {
            const x = Phaser.Math.Between(100, 1800); 
            const jawa = new Jawa(this, x, 0);  
            this.jawaGroup.add(jawa);
        }

        this.physics.add.collider(this.jawaGroup, this.ground);
    }
    
}