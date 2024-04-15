import { Scene, GameObjects } from "phaser";

export class CustomButton extends GameObjects.Container{

    mySprite: Phaser.GameObjects.Sprite;
    myText: Phaser.GameObjects.Text;

    constructor(scene: Scene, x: number, y: number, texture: string, scaleMultiplier: number, callbackUp: any, callbackDown: any){
        super(scene, 0, 0);

        //this.myScene = scene;
        this.mySprite = scene.add.sprite(x, y, texture);

        this.mySprite.setScale(scaleMultiplier);

        this.mySprite.setFrame(0);
        this.mySprite.setInteractive({ useHandCursor: true });
        this.mySprite.on('pointerdown', () => {
            this.mySprite.setFrame(1); // Switch to frame 1 when pressed
            if(callbackDown){
                callbackDown();
            }
        });
        this.mySprite.on('pointerup', () => {
            this.mySprite.setFrame(0) // Return to frame 0 when releasing the button
            if (callbackUp) {
                callbackUp();
            }
        })

        scene.add.existing(this);
    };
}