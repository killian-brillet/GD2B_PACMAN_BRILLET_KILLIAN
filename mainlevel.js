var fond;

var map;
var mapPath;

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
var touched;

var fantomeennemi1;
var fantomeennemi2;
var random;

var pacgum;
var powerup;

var buttoneasy;
var buttonnormal;
var difficulty;
var ennemycreated;

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
        this.load.image('fantome2', 'assets/fantome2.png')
        this.load.image('powerup','assets/powerup.png');

        this.load.image('boutoneasy','assets/easy.png');
        this.load.image('boutonnormal','assets/normal.png');

        this.load.image('obstacle','assets/obstacle.png')
        this.load.image('pacgumasset','assets/pacgum.png');
        this.load.tilemapTiledJSON('carte', 'TILED/mapPacman.json');
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
        player = this.physics.add.sprite(260,380,'pacman')
        player.setOrigin(0.5,0.5)
        player.setCollideWorldBounds(true)
        
        pacgum = this.physics.add.sprite(260,280,'pacgumasset')

        powerup = this.physics.add.sprite(860,360,'powerup')

        fantomeennemi1 = this.physics.add.sprite(700,360,'fantome')
        fantomeennemi1.setScale(2.4)

        fantomeennemi2 = this.physics.add.sprite(620,360,'fantome2')
        fantomeennemi2.setScale(2.4)
        fantomeennemi2.setVelocityY(-100)

        // Creation map

        const map = this.make.tilemap({key: 'carte'})
        const obstacles = map.addTilesetImage('Obstacle','obstacle')
        const levelPacman = map.createLayer('murs', obstacles, 0,0)
        levelPacman.setCollisionByExclusion(-1, true);

        // Ajout Bouton Difficulté

        ennemycreated = false;
        this.physics.pause()
        buttoneasy = this.add.sprite(640,300,'boutoneasy').setInteractive({ cursor: 'pointer' })
        buttonnormal = this.add.sprite(640,500,'boutonnormal').setInteractive({ cursor: 'pointer' })

        // Colliders

        this.physics.add.collider(player, levelPacman);
        this.physics.add.collider(fantomeennemi1, levelPacman);
        this.physics.add.collider(fantomeennemi2, levelPacman);
        this.physics.add.collider(player, fantomeennemi1, hitEnnemi, null, this);
        this.physics.add.collider(player, fantomeennemi2, hitEnnemi, null, this);
        this.physics.add.overlap(player, pacgum, hitPacgum, null, this);
        this.physics.add.collider(player, powerup, hitPowerup, null, this);

        touched = false
        function hitEnnemi(player, fantomeennemi){ 
            touched = true
            if (powerupon == true){
                console.log('Destruction')
                fantomeennemi.destroy()
            }
            else{
                console.log('GameOver')
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
            player.setTint(0xff0000);
        }

    }

    update(){

        buttoneasy.on('pointerdown', function(){

            if (ennemycreated == false){
                this.physics.resume()
                buttoneasy.destroy()
                buttonnormal.destroy()

                fantomeennemi2.destroy()

                difficulty = 1
                ennemycreated = true
            }

        }, this);

        buttonnormal.on('pointerdown', function(){

            if (ennemycreated == false){
                this.physics.resume()
                buttoneasy.destroy()
                buttonnormal.destroy()

                difficulty = 2
                ennemycreated = true
            }

        }, this);




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
        
        if (touched == false && powerupon == false && difficulty != null){
            this.physics.moveToObject(fantomeennemi1, player, 100);
        }

        if (difficulty == 2  && touched != true){
            if (fantomeennemi2.body.blocked.up){
                random = Phaser.Math.Between(0,1)
                if (random == 0){
                    fantomeennemi2.setVelocityX(-100)
                }
                else {
                    fantomeennemi2.setVelocityX(100)
                }
            }
            else if (fantomeennemi2.body.blocked.down){
                random = Phaser.Math.Between(0,1)
                if (random == 0){
                    fantomeennemi2.setVelocityX(-100)
                }
                else {
                    fantomeennemi2.setVelocityX(100)
                }
            }
            else if (fantomeennemi2.body.blocked.right){
                random = Phaser.Math.Between(0,1)
                if (random == 0){
                    fantomeennemi2.setVelocityY(-100)
                }
                else {
                    fantomeennemi2.setVelocityY(100)
                }
            }
            else if (fantomeennemi2.body.blocked.left){
                random = Phaser.Math.Between(0,1)
                if (random == 0){
                    fantomeennemi2.setVelocityY(-100)
                }
                else {
                    fantomeennemi2.setVelocityY(100)
                } 
            }       
        }
    }
    
}
