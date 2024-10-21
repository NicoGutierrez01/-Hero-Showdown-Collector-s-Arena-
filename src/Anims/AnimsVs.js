export class AnimsVs extends Phaser.Scene {
    constructor() {
        super('AnimsVs');
    }

    create() {
        this.anims.create({
            key: 'walkhierro',
            frames: this.anims.generateFrameNumbers('hierrospade', { start: 0, end: 7 }),
            frameRate: 20,
            repeat: 0
        });

        this.anims.create({
            key: 'idlehierro',
            frames: this.anims.generateFrameNumbers('hierrospade', { start: 8, end: 13 }),
            frameRate: 12,
            repeat: 0
        });

        this.anims.create({
            key: 'jumphierro',
            frames: this.anims.generateFrameNumbers('hierrospade', { start: 14, end: 17 }),
            frameRate: 4,
            repeat: 0  
        });

        this.anims.create({
            key: 'actionhierro',
            frames: this.anims.generateFrameNumbers('hierrospade', { start: 18, end: 30 }),
            frameRate: 15,
            repeat: 0  
        });

        this.anims.create({
            key: 'walkshelly',
            frames: this.anims.generateFrameNumbers('shellyspade', { start: 0, end: 7 }),
            frameRate: 20,
            repeat: 0
        });

        this.anims.create({
            key: 'idleshelly',
            frames: this.anims.generateFrameNumbers('shellyspade', { start: 8, end: 13 }),
            frameRate: 12,
            repeat: 0
        });

        this.anims.create({
            key: 'jumpshelly',
            frames: this.anims.generateFrameNumbers('shellyspade', { start: 14, end: 17 }),
            frameRate: 4,
            repeat: 0  
        });

        this.anims.create({
            key: 'actionshelly',
            frames: this.anims.generateFrameNumbers('shellyspade', { start: 18, end: 30 }),
            frameRate: 15,
            repeat: 0  
        });

        this.anims.create({
            key: 'walkpez',
            frames: this.anims.generateFrameNumbers('pezspade', { start: 0, end: 7 }),
            frameRate: 20,
            repeat: 0
        });

        this.anims.create({
            key: 'idlepez',
            frames: this.anims.generateFrameNumbers('pezspade', { start: 8, end: 13 }),
            frameRate: 12,
            repeat: 0
        });

        this.anims.create({
            key: 'jumppez',
            frames: this.anims.generateFrameNumbers('pezspade', { start: 14, end: 17 }),
            frameRate: 4,
            repeat: 0  
        });

        this.anims.create({
            key: 'actionpez',
            frames: this.anims.generateFrameNumbers('pezspade', { start: 18, end: 30 }),
            frameRate: 15,
            repeat: 0  
        });

    }
}
