export class Jawa extends Phaser.Physics.Arcade.Sprite {  
    constructor(scene, x, y) {
        super(scene, x, y, 'jawa');  
        scene.add.existing(this);     
        scene.physics.add.existing(this); 

        this.setGravityY(300);         
        this.setCollideWorldBounds(true); 
        this.body.setVelocityX(Phaser.Math.Between(-100, 100)); 
    }
}
