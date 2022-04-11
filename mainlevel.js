var fond;

var map;

var spritepacman;
var spritefantome1;
var spriteobstacle;
var spritepacgum;
var spritepowerup;

var up;
var down;
var left;
var right;

var player;
var powerupon = false;

var fantomeennemi1;
var pacgum;
var powerup;

class Level extends Phaser.Scene{
    constructor(){
        super("scenelevel");
    }
    init(data){
    }

    preload(){
        this.load.image('fond', 'assets/fond.png');

        this.load.image('pacman','assets/pacman.png');
        this.load.image('fantome', 'assets/fantome.png')
        this.load.image('pacgum','assets/pacgum.png');
        this.load.image('powerup','assets/powerup.png');

        this.load.image('obstacle','assets/obstacle.png')
    }

    create(){
        // Creation Sprites
       fond = this.add.image(640,360,'fond')
       this.physics.world.setBounds(0, 0, 1280, 720);


       //Controles
       up = this.input.keyboard.addKeys('Z')
       down = this.input.keyboard.addKeys('S');
       left = this.input.keyboard.addKeys('Q');
       right = this.input.keyboard.addKeys('D');

       // Création Sprites
        player = this.physics.add.sprite(600,360,'pacman')
        player.setOrigin(0.5,0.5)
        player.setCollideWorldBounds(true)

        fantomeennemi1 = this.physics.add.sprite(700,360,'fantome')
        fantomeennemi1.setScale(2.4)
        
        pacgum = this.physics.add.sprite(300,360,'pacgum')

        powerup = this.physics.add.sprite(900,360,'powerup')

        // Creation map

        var map = this.make.tilemap({ key : 'map'});
        var tiles = map.addTilesetImage('obstacle');
        var layer = map.createLayer('ground', tiles, 0, 0)

        // Colliders

        this.physics.add.collider(player, fantomeennemi1, hitEnnemi, null, this);
        this.physics.add.collider(player, pacgum, hitPacgum, null, this);
        this.physics.add.collider(player, powerup, hitPowerup, null, this);


        function hitEnnemi(player, fantomeennemi1){ 
            if (powerupon = true){
                fantomeennemi1.destroy()
            }
            else{
                this.physics.pause()
                this.scene.restart()
            }
        }

        function hitPacgum(player, pacgum){ 
            pacgum.destroy()
        }

        function hitPowerup(player, powerup){ 
            powerup.destroy()
            powerupon = true;
        }
    }

    update(){
        if (right.D.isDown)
        {
            console.log('Test')
            player.setVelocityX(200)
            player.setVelocityY(0)
            player.setAngle(0)
        }
        
        else if (left.Q.isDown)
        {
            player.setVelocityX(-200)
            player.setVelocityY(0)
            player.setAngle(180)
        }
        
        else if (up.Z.isDown)
        {
            player.setVelocityX(0)
            player.setVelocityY(-200)
            player.setAngle(270)
        }

        else if (down.S.isDown)
        {
            player.setVelocityX(0)
            player.setVelocityY(200)
            player.setAngle(90)
        }
    }
}
