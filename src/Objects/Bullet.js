export class Bullet extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {

        super(scene, x, y, 'bullet');  

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setScale(0.4);
        this.body.setGravityY(0);

    }
}