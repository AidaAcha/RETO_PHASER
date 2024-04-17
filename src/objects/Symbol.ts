import { Scene, GameObjects } from "phaser";
import { myAnimation } from './Interfaces';
import { MySymbolPrize } from "./MySymbolPrize";

export class Symbol extends GameObjects.Container{
    
    //porque no puedo poner const a una interfaz? 
    bTWeens: boolean;
    mySpriteSymbol: Phaser.GameObjects.Sprite;
    animIdle: any;
    animActive: any;
    myTweens: Phaser.Tweens.Tween;
    mySpritePrize: MySymbolPrize;

    constructor(scene: Scene, x: number, y: number, textureSymbol: string, myPrize:MySymbolPrize, scaleMultiplier: number){
        super(scene, x, y);

        const animInterfIdle: myAnimation = {
            key: 'idle',
            frames: this.scene.anims.generateFrameNumbers(textureSymbol, { frames: [0, 1] }),
            frameRate: 5,
            repeat: -1
        };

        const animInterfActive: myAnimation = {
            key: 'active',
            frames: this.scene.anims.generateFrameNumbers(textureSymbol, {frames: [2, 3, 4, 5]}),
            frameRate: 5,
            repeat: 0 // repeat indefinitely
        };
        
        this.animIdle = scene.anims.create(animInterfIdle);
        this.animActive = scene.anims.create(animInterfActive);
        
        this.mySpriteSymbol = scene.add.sprite(0, 0, textureSymbol);
        this.add(this.mySpriteSymbol);

        this.mySpriteSymbol.setScale(scaleMultiplier);

        this.mySpritePrize = myPrize;

        scene.add.existing(this);
        this.playIdleAnimation();
    };

    playIdleAnimation(){
        this.mySpritePrize.visible = false;
        this.mySpriteSymbol.play('idle', true);
    };

    playActiveSymbol(){
        
        this.mySpriteSymbol.play('active', true)

        this.mySpriteSymbol.on('animationcomplete', (animation: Phaser.Animations.Animation) => {
            if (animation.key === 'active') {
                // If the first animation has completed, call playIdleAnimation() method to start the second animation
                this.playIdleAnimation();
                
            }
        });
    };

    tweensObjet() {

        if(this.bTWeens) return;
        this.bTWeens = true;
        if(this.myTweens && this.myTweens.isActive()){
            this.myTweens.remove();
        }

        this.mySpritePrize.showRandomImage();

        this.myTweens = this.scene.tweens.add({
           
            targets: this.mySpriteSymbol,
            x: '+=10', 
            yoyo: true,
            repeat: 3, 
            duration: 100,
            onComplete: () => {
                
                this.bTWeens = false;
                this.playIdleAnimation();
            }
        });

        
        

    }
}
