export class Spade extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {

        super(scene, x, y, 'spade');  

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.body.setGravityY(300);
        this.body.setVelocityY(Phaser.Math.Between(50, 100));

        this.body.setCollideWorldBounds(true);
    }

}