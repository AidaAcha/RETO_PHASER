export class Game extends Phaser.Scene {
    constructor(){
        super({key:'game'})
    }

    preload(){
        this.load.image('background', 'image/Background.jpg')
        this.load.spritesheet('bubble', 'image/bubble.png', { frameWidth: 32, frameHeight: 32 })
        this.load.spritesheet('button_spritesheet', 'image/button.png', { frameWidth: 48, frameHeight: 16 });
    }

    create(){
        this.add.image(400, 266.5, 'background')

        this.symbol = new Symbol(this, 400, 200, 'bubble', 5)

        this.button = new CustomButton(this, 400, 400, 'button_spritesheet', 48, 16, 'Haz clic', { fontSize: '24px', fill: '#000' }, 4, () => {
            this.symbol.playActiveSymbol()
        });

        

        this.symbol.playIdleAnimation()
    }

    
}