export class Jawa extends Phaser.Physics.Arcade.Sprite {  
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);  
        scene.add.existing(this);     
        scene.physics.add.existing(this); 

        this.setScale(0.5);
        this.setGravityY(300);         
        this.setCollideWorldBounds(true); 
    }

    followPlayer(player1, player2, moveSpeed) {
        const player1Distance = Phaser.Math.Distance.Between(this.x, this.y, player1.x, player1.y);
        const player2Distance = Phaser.Math.Distance.Between(this.x, this.y, player2.x, player2.y);

        let targetPlayer = player1Distance < player2Distance ? player1 : player2;

        const speed = moveSpeed;  

        if (this.x < targetPlayer.x) {
            this.setVelocityX(speed);  
        } else if (this.x > targetPlayer.x) {
            this.setVelocityX(-speed);
        }

        if (this.y < targetPlayer.y) {
            this.setVelocityY(speed);   
        } else if (this.y > targetPlayer.y) {
            this.setVelocityY(-speed);  
        }
    }
}
