class CustomButton extends Phaser.GameObjects.Container{
    constructor(scene, x, y, texture, frameWidth, frameHeight, text, style, scaleMultiplier, callback){
        super(scene, x, y)

        // Create the button as a sprite
        this.buttonSprite = scene.add.sprite(0, 0, texture)
        this.add(this.buttonSprite)

        // Configurar el multiplicador de escala
        this.buttonSprite.setScale(scaleMultiplier)

        // Enable PIXELART smoothing mode to maintain pixel sharpness
        //this.buttonSprite.setPixelArt(true);

        // Create button text
        this.buttonText = scene.add.text(0, 0, text, style).setOrigin(0.5)
        this.add(this.buttonText)

        // Configure the frame size
        //this.buttonSprite.setFrameSize(frameWidth, frameHeight);

        // Configure the animation of the button when pressed
        this.buttonSprite.setFrame(0) // Set the initial frame
        this.buttonSprite.setInteractive({ useHandCursor: true })
        this.buttonSprite.on('pointerdown', () => {
            this.buttonSprite.setFrame(1); // Switch to frame 1 when pressed
            if (callback) {
                callback()
            }
        });
        this.buttonSprite.on('pointerup', () => {
            this.buttonSprite.setFrame(0) // Return to frame 0 when releasing the button
        })

        

        scene.add.existing(this)
    
    }
}