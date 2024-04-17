import { GameObjects } from "phaser";
export class MySymbolPrize extends GameObjects.Sprite{

    myTotalFrame: number;

    constructor(scene: Phaser.Scene, x: number, y: number, key: string, totalFrame: number){
        super(scene, x, y, key);

        this.myTotalFrame = totalFrame;
        scene.add.existing(this);

        //Make the sprite not show at first
        this.visible = false;
    }

    public showRandomImage(){
        this.visible = true;
        var frameIndex = Phaser.Math.Between(0, this.myTotalFrame - 1);
        this.setFrame(frameIndex);
    }
}