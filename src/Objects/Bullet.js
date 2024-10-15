export class Bullet extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {

        super(scene, x, y, 'bullet');  

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.body.setGravityY(300);

        this.body.setCollideWorldBounds(true);
    }

}