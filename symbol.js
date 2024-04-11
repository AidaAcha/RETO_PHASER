class Symbol extends Phaser.GameObjects.Container{
    constructor(scene, x, y, texture, scaleMultiplier){
        super(scene, x, y)

        // Create the button as a sprite
        this.sprite = scene.add.sprite(0, 0, texture)
        this.add(this.sprite)

        // Configurar el multiplicador de escala
        this.sprite.setScale(scaleMultiplier)

        // Idle animation
        scene.anims.create({
            key: 'idle',
            frames: scene.anims.generateFrameNumbers(texture, { start: 0, end: 1 }),
            frameRate: 5,
            repeat: -1 // Repetir indefinidamente
        });

        // Play idle animation
        this.play('idle');

        scene.add.existing(this)
    }

    update(){

    }
}