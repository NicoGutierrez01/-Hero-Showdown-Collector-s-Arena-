import { Scene } from 'phaser';
import { InputManager } from '../Components/InputManager'; 
import { inputConfigs } from '../utils/inputConfigs';
import { Bomb } from '../Objects/Bomb';
import { Jawa } from '../Objects/Jawas';
import { Bullet } from '../Objects/Bullet';
import { Life } from '../Objects/Life';
import { getPhrase } from '../service/translations';


export class Coop extends Scene {
    constructor() {
        super('Coop');
        this.player1Score = 0;
        this.player2Score = 0;
        this.gameOver = false;
        this.jawaGroup = null; 
        this.initialLives = 3;
        this.initialSpawnDelay = 10000; 
        this.initialJawaSpeed = 100; 
        this.spawnMultiplier = 0.95; 
        this.speedIncrement = 20;
        this.baseTexture = "gun";
    }

    puntos;
    tiempo;
    jawas;

    init(data) {
        const savedVolume = localStorage.getItem('gameVolume') ? parseInt(localStorage.getItem('gameVolume'), 10) : 100;
        this.player1texture = data.player1;
        this.player2texture = data.player2;
        this.spawnDelay = this.initialSpawnDelay; 
        this.jawaSpeed = this.initialJawaSpeed;
        this.sharedLives = this.initialLives;
        this.jawasKilled = data.jawas || 0;
        this.sharedScore = data.puntos || 0;
        this.maxBullets = 5;       
        this.reloadTime = 2000;    
        this.player1Bullets = this.maxBullets;
        this.player2Bullets = this.maxBullets;
        this.tiempo = data.tiempo || 0;
        if (!this.TrackGame || !this.TrackGame.isPlaying) {
            this.TrackGame = this.sound.add('TrackGame', { volume: savedVolume / 100, loop: true });
            this.TrackGame.play();
        } else if (this.TrackGame.isPaused) {
            this.TrackGame.resume();
        }
    }

    create() {
        this.anims.remove('walk-1');
        this.anims.remove('idle-1');
        this.anims.remove('jump-1');
        this.anims.remove('action-1');
        this.anims.remove('walk-2');
        this.anims.remove('idle-2');
        this.anims.remove('jump-2');
        this.anims.remove('action-2');

        this.anims.create({
            key: 'devil',
            frames: this.anims.generateFrameNumbers('animdevil', { start: 0, end: 8 }), 
            frameRate: 10,
            repeat: -1 
        });
        
        this.player1Reloading = false;
        this.player2Reloading = false;

        this.player1CanAttack = true;  
        this.player2CanAttack = true;  

        this.jawaGroup = this.physics.add.group({
            runChildUpdate: true  
        });
        
        this.add.image(960, 540, 'fondocoop');
        this.devil = this.physics.add.sprite(512, 100, 'animdevil').setScale(0.36);
        this.devil.anims.play('devil');      
        this.devil.setImmovable(true);
        this.devil.body.allowGravity = false; 

        this.scoreText = this.add.text(130, 50, getPhrase('Puntaje:'),{
            fontFamily: 'Rockwell', fontSize: 38, color: '#ffffff', align: 'center'
        }).setOrigin(0.5);

        this.livesImages = this.add.group();

        this.updateLivesDisplay();

        this.sharedTimer = this.time.addEvent({
            delay: 1000, 
            callback: () => this.tiempo++,
            callbackScope: this,
            loop: true
        });

        this.tweens.add({
            targets: this.devil,
            x: { from: 350, to: 1570 }, 
            duration: 4000, 
            ease: 'Linear', 
            yoyo: true, 
            repeat: -1 
        });

        this.physics.add.staticImage(960, 1080, 'negro').setDisplaySize(1920, 50).setOrigin(0.5, 0.5).refreshBody(); 
        this.ground = this.physics.add.staticGroup();
        
        this.ground.add(this.physics.add.staticImage(960, 540, 'platform').setOrigin(0.5, 0.5).refreshBody().setSize(400,30));  
        this.ground.add(this.physics.add.staticImage(200, 810, 'platform').setOrigin(0.5, 0.5).refreshBody().setSize(400,30));    
        this.ground.add(this.physics.add.staticImage(1720, 810, 'platform').setOrigin(0.5, 0.5).refreshBody().setSize(400,30)); 
        this.ground.add(this.physics.add.staticImage(200, 270, 'platform').setOrigin(0.5, 0.5).refreshBody().setSize(400,30)); 
        this.ground.add(this.physics.add.staticImage(1720, 270, 'platform').setOrigin(0.5, 0.5).refreshBody().setSize(400,30)); 

        this.player1 = this.physics.add.sprite(480, 1000, this.player1texture).setScale(0.7);
        this.player1.setCollideWorldBounds(true);
        this.player1.setGravityY(300);
        this.player1.number = "1";
        this.player1.setSize(190, 206); 
        this.player1.setOffset(20, 10);

        this.player2 = this.physics.add.sprite(1440, 1000, this.player2texture).setScale(0.7).setSize(180, 190);
        this.player2.setCollideWorldBounds(true);
        this.player2.setGravityY(300);
        this.player2.number = "2";
        this.player2.setSize(290, 200); 
        this.player2.setOffset(10, 10);

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
                action: () => this.shootBullet(this.player1, this.player1CanAttack),
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
                action: () => this.shootBullet(this.player2, this.player2CanAttack),
                stop: () => this.stopPlayer(this.player2)
            }
        });

        this.fallingObjects = this.physics.add.group();

        this.time.addEvent({
            delay: 10000, 
            callback: this.spawnFallingObject,
            callbackScope: this,
            loop: true
        });

        this.physics.add.overlap(this.player1, this.fallingObjects, this.collectObject, null, this);
        this.physics.add.overlap(this.player2, this.fallingObjects, this.collectObject, null, this);

        this.physics.add.collider(this.spawnFallingObject, this.ground);

        this.physics.world.setBoundsCollision(true, true, true, true);

        this.eventspawnJawaWave = this.time.addEvent({
            delay: this.spawnDelay,
            callback: this.spawnJawaWave,
            callbackScope: this
        });

        this.physics.add.collider(this.spawnJawaWave, this.ground);

        this.physics.add.overlap(this.player1, this.jawaGroup, this.jawaCollision, null, this);
        this.physics.add.overlap(this.player2, this.jawaGroup, this.jawaCollision, null, this);

        const backButton = this.add.image(1870, 50, 'botonback')

        backButton.setInteractive({ cursor: 'pointer' });
    
        backButton.on('pointerdown', () => {
            this.TrackGame.pause();
            this.scene.start('MainMenu');
        });
    }

    update() {
        this.jawaGroup.children.iterate(jawa => {
            jawa.followPlayer(this.player1, this.player2, this.jawaSpeed);
        });
    }

    updateLivesDisplay() {
        this.livesImages.clear(true, true);
    
        for (let i = 0; i < this.sharedLives; i++) {
            const lifeImage = this.add.image(1700 + i * 40, 50, 'Lives'); 
            lifeImage.setScale(0.05); 
            this.livesImages.add(lifeImage);
        }
    }
    
    movePlayer(player, direction) {
        const speed = 400;
        const jumpVelocity = -450;

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
        });
    }

    spawnFallingObject() {
        const xPosition = Phaser.Math.Between(50, 974); 
        const yPosition = Phaser.Math.Between(50, 1030);
        let object;
        const objectType = Phaser.Math.Between(1, 2); 
        
        console.log(objectType)
        console.log(this)

        if (objectType === 1) {
            object = new Bomb(this, xPosition, 0).setScale(0.4);
            object.hasCollided = false;

            const randombob = Phaser.Math.Between(10, 50);
            
            this.physics.add.overlap(object, this.player1, () => {
                if (!object.hasCollided) {
                    object.hasCollided = true;
    
                    object.play('explode');
                    this.sharedScore -= randombob;
                    this.scoreText.setText(getPhrase('Puntaje:') + ' ' + this.sharedScore);
    
                    object.on('animationcomplete', () => {
                        object.destroy();
                    });
                }
            });
    
            this.physics.add.overlap(object, this.player2, () => {
                if (!object.hasCollided) {
                    object.hasCollided = true;
    
                    object.play('explode');
                    this.sharedScore -= randombob;
                    this.scoreText.setText((getPhrase('Puntaje:') + ' ' + this.sharedScore));
    
                    object.on('animationcomplete', () => {
                        object.destroy();
                    });
                }
            });
        } 
        
        if (objectType === 2) {
            object = new Life(this, xPosition, yPosition).setScale(0.07);
            object.hasCollided = false;
            
            const randomPoints = Phaser.Math.Between(20, 60);
    
            this.physics.add.overlap(object, this.player1, () => {
                if (!object.hasCollided) {
                    object.hasCollided = true;
    
                    if (this.sharedLives < 3) {
                        this.sharedLives ++;
                        this.updateLivesDisplay();
                    }
                    object.destroy();
                }
            });
    
            this.physics.add.overlap(object, this.player2, () => {
                if (!object.hasCollided) {
                    object.hasCollided = true;
    
                    if (this.sharedLives < 3) {
                        this.sharedLives ++;
                        this.updateLivesDisplay();
                    }
    
                    object.destroy();
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
            let x, y;
            const spawnSide = Phaser.Math.Between(1, 3); 
    
            if (spawnSide === 1) { 
                x = Phaser.Math.Between(100, 1800);
                y = 0;
            } else if (spawnSide === 2) { 
                x = 0;
                y = Phaser.Math.Between(100, 1080);
            } else { 
                x = 1920;
                y = Phaser.Math.Between(100, 1080);
            }
    
            const jawaTexture = Phaser.Math.Between(0, 1) === 0 ? 'jawaA' : 'jawaV';
            const jawa = new Jawa(this, x, y, jawaTexture);
    
            if (spawnSide === 1) {
                jawa.setVelocityY(this.jawaSpeed); 
            } else {
                jawa.setVelocityX(spawnSide === 2 ? this.jawaSpeed : -this.jawaSpeed); 
            }
    
            this.jawaGroup.add(jawa);           
        }
        
        this.jawaSpeed += this.speedIncrement;
        this.spawnDelay = Math.max(this.spawnDelay * this.spawnMultiplier, 2000);  
    
        this.physics.add.collider(this.jawaGroup, this.ground);
    
        if (this.eventspawnJawaWave) {
            this.eventspawnJawaWave.destroy();
            this.eventspawnJawaWave = null;
        }
    
        this.eventspawnJawaWave = this.time.addEvent({
            delay: this.spawnDelay,
            callback: this.spawnJawaWave,
            callbackScope: this
        });
    }
    
    findClosestJawa(player, jawaGroup) {
        let closestJawa = null;
        let closestDistance = Infinity;
    
        jawaGroup.children.iterate(jawa => {
            if (jawa.active) {  
                const distance = Phaser.Math.Distance.Between(player.x, player.y, jawa.x, jawa.y);
                if (distance < closestDistance) {
                    closestDistance = distance;
                    closestJawa = jawa;
                }
            }
        });
    
        return closestJawa;  
    }

    shootBullet(player) {
        const bulletSpeed = 500;
    
        if (!this[`player${player.number}CanAttack`] || this[`player${player.number}Bullets`] <= 0) return;
    
        player.anims.play(`action-${player.number}`, true);
    
        const closestJawa = this.findClosestJawa(player, this.jawaGroup);
        
        let target = null;
        if (this.devil && this.devil.active) {
            const distanceToDevil = Phaser.Math.Distance.Between(player.x, player.y, this.devil.x, this.devil.y);
            const distanceToJawa = closestJawa ? Phaser.Math.Distance.Between(player.x, player.y, closestJawa.x, closestJawa.y) : Infinity;
    
            target = distanceToJawa <= distanceToDevil ? closestJawa : this.devil;
        } else {
            target = closestJawa;
        }
    
        const bullet = new Bullet(this, player.x, player.y);
        bullet.body.setCollideWorldBounds(true);
        bullet.body.onWorldBounds = true;
    
        if (target) {
            const angle = Phaser.Math.Angle.Between(player.x, player.y, target.x, target.y);
            bullet.body.setVelocity(
                bulletSpeed * Math.cos(angle),
                bulletSpeed * Math.sin(angle)
            );
        } else {
            bullet.body.setVelocity(0, -bulletSpeed); 
        }
    
        this[`player${player.number}Bullets`]--;
        if (this[`player${player.number}Bullets`] <= 0 && !this[`player${player.number}Reloading`]) {
            this.reloadPlayerBullets(player.number);
        }
    
        if (this.devil && this.devil.active) {
            this.physics.add.collider(bullet, this.devil, this.onDevilHit, null, this);
        }
    
        this.physics.add.collider(bullet, this.jawaGroup, (bullet, jawa) => {
            jawa.destroy();
            bullet.destroy();
    
            const scoreIncrement = Phaser.Math.Between(5, 20);
            this.sharedScore += scoreIncrement;
            this.jawasKilled++;
            this.scoreText.setText(getPhrase('Puntaje:') + ' ' + this.sharedScore);
        });
    
        this.physics.add.collider(bullet, this.ground, () => {
            bullet.destroy();
        });
    
        bullet.body.onWorldBounds = true;
        this.physics.world.on('worldbounds', (body) => {
            if (body.gameObject === bullet) {
                bullet.destroy();
            }
        });
    }    
    
    onDevilHit(bullet, devil) {
        bullet.destroy();
    
        if (!devil.health) {
            devil.health = 50000000; 
        }
        devil.health--;
        this.sharedScore += 150; 
        this.scoreText.setText(getPhrase('Puntaje:') + ' ' + this.sharedScore);

        if (devil.health <= 0) {
            devil.destroy(); 
        } else {
            devil.setTint(0xff0000); 
            this.time.delayedCall(100, () => devil.clearTint()); 
        }

        devil.setPosition(devil.x, devil.y);
    }
    
    reloadPlayerBullets(playerNumber) {
        this[`player${playerNumber}Reloading`] = true;
        this.time.delayedCall(this.reloadTime, () => {
            this[`player${playerNumber}Bullets`] = this.maxBullets;
            this[`player${playerNumber}Reloading`] = false;
        });
    }
    

    reloadPlayerBullets(playerNumber) {
        if (playerNumber === "1") {
            this.player1Reloading = true;
            this.time.delayedCall(this.reloadTime, () => {
                this.player1Bullets = this.maxBullets;
                this.player1Reloading = false;
            });
        } else if (playerNumber === "2") {
            this.player2Reloading = true;
            this.time.delayedCall(this.reloadTime, () => {
                this.player2Bullets = this.maxBullets;
                this.player2Reloading = false;
            });
        }
    }    
    
    jawaCollision(player, jawa) {
        jawa.destroy();
        this.sharedLives--;
    
        this.updateLivesDisplay();
    
        console.log(`sharedLives: ${this.sharedLives}, sharedScore: ${this.sharedScore}, jawasKilled: ${this.jawasKilled}`);
    
        if (this.sharedLives <= 0) {
            this.TrackGame.pause();
            this.sharedTimer.remove();


            this.scene.start('GameOver2', { 
                sharedScore: this.sharedScore, 
                jawasKilled: this.jawasKilled,
                tiempo: this.tiempo
            });
        } 
    }  
}