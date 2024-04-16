import { Scene, GameObjects } from "phaser";
import { myAnimation } from './Interfaces';

export class Symbol extends GameObjects.Container{
    
    //porque no puedo poner const a una interfaz? 
    bTWeens: boolean;
    mySprite: Phaser.GameObjects.Sprite;
    animIdle: any;
    animActive: any;
    myTweens: Phaser.Tweens.Tween;



    constructor(scene: Scene, x: number, y: number, texture: string, scaleMultiplier: number){
        super(scene, x, y);

        const animInterfIdle: myAnimation = {
            key: 'idle',
            frames: this.scene.anims.generateFrameNumbers(texture, { frames: [0, 1] }),
            frameRate: 5,
            repeat: -1
        };

        const animInterfActive: myAnimation = {
            key: 'active',
            frames: this.scene.anims.generateFrameNumbers(texture, {frames: [2, 3, 4, 5]}),
            frameRate: 5,
            repeat: 0 // repeat indefinitely
        };
        
        this.animIdle = scene.anims.create(animInterfIdle);
        this.animActive = scene.anims.create(animInterfActive);
        
        this.mySprite = scene.add.sprite(0, 0, texture);
        this.add(this.mySprite);

        this.mySprite.setScale(scaleMultiplier);
        scene.add.existing(this);
        this.playIdleAnimation();
    };

    playIdleAnimation(){
        this.mySprite.play('idle', true);
    };

    playActiveSymbol(){
        
        this.mySprite.play('active', true)

        this.mySprite.on('animationcomplete', (animation: Phaser.Animations.Animation) => {
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

            // Crear la animación de vibración
        this.myTweens = this.scene.tweens.add({
           
            targets: this.mySprite,
            x: '+=10', // Mover el objeto 10 píxeles hacia la derecha
            yoyo: true,
            repeat: 3, // Repetir la animación 3 veces
            duration: 100,
            onComplete: () => {
                // Esta función se ejecutará cuando la animación de vibración esté completa
                // Resolvemos la promesa para indicar que la animación ha terminado
                this.bTWeens = false;
                this.playIdleAnimation();
            }
        });
    }
}
