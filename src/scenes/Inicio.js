import { Scene } from 'phaser';

export class Inicio extends Scene
{
    constructor ()
    {
        super('Inicio');
    }

    create ()
    {
        const intro = this.add.video(0, 0, 'intro')
            .setScale(2.8);

        Phaser.Display.Align.In.Center(intro, this.add.zone(960, 540, 1024, 768));

        this.cameras.main.fadeIn(2000);

        intro.play();

        intro.once('complete', () => {
            this.cameras.main.fadeOut(1000);
        });

        this.cameras.main.once('camerafadeoutcomplete', () => {
            this.scene.start('MainMenu');
        });

        this.input.once('pointerdown', () => {
                this.scene.start('MainMenu');
        });
    }
}
