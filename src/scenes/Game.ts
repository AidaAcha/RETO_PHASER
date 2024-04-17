import { Scene } from 'phaser';
import { CustomButton } from '../objects/CustomButton';
import { Symbol } from '../objects/Symbol'
import { MySymbolPrize } from '../objects/MySymbolPrize'

export class Game extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    msg_text : Phaser.GameObjects.Text;
    myButton : CustomButton;
    mySymbol : Symbol;
    mySymbolPrize : MySymbolPrize;

    constructor ()
    {
        super('Game');
    }

    create ()
    {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0x00ff00);

        /*this.background = this.add.image(512, 384, 'background');
        this.background.setAlpha(0.5);

        this.msg_text = this.add.text(512, 384, 'Make something fun!\nand share it with us:\nsupport@phaser.io', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        });
        this.msg_text.setOrigin(0.5);

        this.input.once('pointerdown', () => {

            this.scene.start('GameOver');

        });*/

        this.background = this.add.image(512, 384, 'backgroundOcean');
        this.background.setScale(2);
        
        this.mySymbolPrize = new MySymbolPrize(this, 512, 200, 'pets_spriteSheet', 6);

        this.mySymbol = new Symbol(this, 512, 200, 'bubble', this.mySymbolPrize, 6);

        this.myButton = new CustomButton(this, 512, 500, 'button_spritesheet', 4, () => {

            this.mySymbol.playActiveSymbol();
        }, 
        () =>{
            
            this.mySymbol.tweensObjet();
        });

        
    }
}
