export class Jawa extends Phaser.Physics.Arcade.Sprite {  
    constructor(scene, x, y) {
        super(scene, x, y, 'jawa');  
        scene.add.existing(this);     
        scene.physics.add.existing(this); 

        this.setScale(0.5);
        this.setGravityY(300);         
        this.setCollideWorldBounds(true); 
    }

    followPlayer(player1, player2) {
        const player1Distance = Phaser.Math.Distance.Between(this.x, this.y, player1.x, player1.y);
        const player2Distance = Phaser.Math.Distance.Between(this.x, this.y, player2.x, player2.y);

        let targetPlayer = player1Distance < player2Distance ? player1 : player2;

        const speed = 100;  // Velocidad con la que seguirá al jugador

        if (this.x < targetPlayer.x) {
            this.setVelocityX(speed);  // Mover a la derecha
        } else if (this.x > targetPlayer.x) {
            this.setVelocityX(-speed); // Mover a la izquierda
        }

        if (this.y < targetPlayer.y) {
            this.setVelocityY(speed);   // Mover hacia abajo (si lo necesitas)
        } else if (this.y > targetPlayer.y) {
            this.setVelocityY(-speed);  // Mover hacia arriba (si lo necesitas)
        }
    }
}
