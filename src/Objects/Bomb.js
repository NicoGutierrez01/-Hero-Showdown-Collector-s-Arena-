export class Bomb extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'explosion');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setScale(0.3);

        this.body.setGravityY(300);
        this.body.setVelocityY(Phaser.Math.Between(50, 100));

        this.body.setCollideWorldBounds(true);

        this.body.setBounce(0.6, 0.6);

        // Temporizador de 5 segundos para explotar
        this.explosionTimer = scene.time.delayedCall(5000, this.explode, [], this);
    }

    explode() {
        // Crear la animación de explosión
        const explosion = this.scene.add.sprite(this.x, this.y, 'explosion').setScale(0.5); 
        explosion.play('explode');

        // Destruir la bomba al explotar
        this.destroy();

        // Eliminar la explosión después de que la animación termine
        this.scene.time.delayedCall(1000, () => {
            explosion.destroy();
        });
    }
}
