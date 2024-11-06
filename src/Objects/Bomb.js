export class Bomb extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {

        super(scene, x, y, 'bomb');

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.body.setGravityY(0);

        this.body.setVelocity(Phaser.Math.Between(200, 300), Phaser.Math.Between(200, 300));

        this.body.setCollideWorldBounds(true);
        this.body.setBounce(1); 

        this.body.onWorldBounds = true;

        scene.physics.add.collider(this, scene.ground, () => {
        });
    }
}