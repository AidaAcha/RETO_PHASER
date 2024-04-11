class Symbol extends Phaser.GameObjects.Container{
    constructor(scene, x, y, texture, scaleMultiplier){
        super(scene, x, y)


        const idle = {
            key: 'idle',
            frames: this.scene.anims.generateFrameNumbers(texture, { frames: [0, 1] }), 
            frameRate: 5,
            repeat: -1 // repeat indefinitely
        }
        const active = {
            key: 'active',
            frames: this.scene.anims.generateFrameNumbers(texture, {frames: [2, 3, 4, 5]}),
            frameRate: 5,
            repeat: 0 // repeat indefinitely
        }

        this.scene.anims.create(idle);
        this.scene.anims.create(active);



        // Create the button as a sprite
        this.sprite = scene.add.sprite(0, 0, texture)
        this.add(this.sprite)

        // Set the scale multiplier
        this.sprite.setScale(scaleMultiplier)

        scene.add.existing(this)
    }

    playIdleAnimation(){
        this.sprite.play('idle', true)
    }

    playActiveSymbol(){
        
        this.sprite.play('active', true)

        this.sprite.on('animationcomplete', (animation, frame) => {
            if (animation.key === 'active') {
                // Si la primera animación ha terminado, llamar al método playAnimation2() para iniciar la segunda animación
                this.sprite.playIdleAnimation()
            }
        })
    }
}