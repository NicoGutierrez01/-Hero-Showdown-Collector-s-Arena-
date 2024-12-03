import Phaser from "phaser";

export class Login extends Phaser.Scene {
  constructor() {
    super("Login");
  }
  
  create() {
    this.add.image(960, 540, 'fondomenu'); 
    this.add.image(960, 590, 'anonymous').setScale(0.5);
    this.add.image(960, 790, 'google').setScale(0.15);


    this.add.text(960, 300, ('Login'), {
        fontFamily: 'Cooper Black', fontSize: 100, color: '#ffffff',
        stroke: '#000000', strokeThickness: 8,
        align: 'center'
    }).setOrigin(0.5);

    this.add.text(960, 500, ('Anonymous'), {
        fontFamily: 'Cooper Black', fontSize: 50, color: '#ffffff',
        stroke: '#000000', strokeThickness: 8,
        align: 'center'
    }).setOrigin(0.5)
      .setInteractive()
      .on("pointerdown", () => {
        this.firebase
          .signInAnonymously()
          .then(() => {
            this.scene.start("MainMenu");
          })
          .catch((error) => {
            console.log("🚀 ~ file: Login.js:74 ~ .catch ~ error", error);
          }); 
      });

 
      this.add.text(960, 700, ('Google'), {
        fontFamily: 'Cooper Black', fontSize: 50, color: '#ffffff',
        stroke: '#000000', strokeThickness: 8,
        align: 'center'
    }).setOrigin(0.5)
      .setInteractive()
      .on("pointerdown", () => {
        this.firebase
          .signInWithGoogle()
          .then(() => {
            this.scene.start("MainMenu");
          })
          .catch((error) => {
            console.log("🚀 ~ file: Login.js:74 ~ .catch ~ error", error);
          });
      });

      this.add.text(960, 850, ('Github'), {
        fontFamily: 'Cooper Black', fontSize: 50, color: '#ffffff',
        stroke: '#000000', strokeThickness: 8,
        align: 'center'
      })
      .setOrigin(0.5)
      .setInteractive()
      .on("pointerdown", () => {
        this.firebase
          .signInWithGithub()
          .then(() => {
            this.scene.start("Preloader");
          })
          .catch((error) => {
            console.log("🚀 ~ file: Login.js:74 ~ .catch ~ error", error);
          });
      });
  }
}