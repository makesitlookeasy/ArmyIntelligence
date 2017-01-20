// Physics Objects
var bird;
var platforms;
var enemies;

// Button Vars
var cursors;
var jumpButton;
var leftButton;
var rightButton;
var position1 = 50;
var position2 = 200;
var position3 = 600;
var buttonState;

// Timing Vars
var randomInterval;
var timeElapsed;

// Motions Vars
var movingLeft;
var movingRight;
var facingLeft;

// UI Vars
var score;
var scoreText;

var playState = {
    create: function(){
        generatePlayer();
        enemies = game.add.physicsGroup();
        generateEnemy();
        generatePlatforms();

        // Keyboard Input
        cursors = game.input.keyboard.createCursorKeys();
        jumpKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        // Buttons
        // Right Button
        rightButton = game.add.button(200,  game.world.height - 120, 'arrow', null, this);
        rightButton.scale.setTo(2,2);
        rightButton.onInputDown.add(rightDown, this);
        rightButton.onInputUp.add(rightUp, this);
        // Left Button
        leftButton = game.add.button(50 ,  game.world.height - 120, 'arrow', null, this)
        leftButton.anchor.setTo(1,1);
        leftButton.angle = 180;
        leftButton.scale.setTo(2,2);
        leftButton.onInputDown.add(leftDown, this);
        leftButton.onInputUp.add(leftUp, this);
        // Jump Button
        jumpButton = game.add.button(600, game.world.height - 120, 'orb', jumpClick, this);
        jumpButton.scale.setTo(4,4);

        // Timing Init
        randomInterval = game.rnd.integerInRange(300,800);
        timeElapsed = 0;

        // Motion Init
        movingLeft = false;
        movingRight = false;
        facingLeft = true;

        // UI Init
        buttonState = 0;
        score = 0;
        scoreText = game.add.bitmapText(0, 0, 'gem', 'SCORE: ', 64);
    },
    update: function(){
        score++;
        scoreText.text = 'SCORE: ' + score;
        game.physics.arcade.collide(bird, platforms);
        game.physics.arcade.collide(enemy, platforms);
        bird.body.velocity.x = 0;
        timeElapsed++;
        moveButtons();
        buttonPosition();
        motion();
        keyboardControls();
    },
};

function moveButtons(){
    if(timeElapsed > randomInterval){
        randomInterval = game.rnd.integerInRange(300,800);
        timeElapsed = 0;
        buttonState = game.rnd.integerInRange(0,2);
    }
}
function buttonPosition(){
    switch(buttonState){
        case 0:
            leftButton.x = position1;
            rightButton.x = position2;
            jumpButton.x = position3;
            break;
        case 1:
            leftButton.x = position2;
            rightButton.x = position3;
            jumpButton.x = position1;
            break;
        case 2:
            leftButton.x = position3;
            rightButton.x = position1;
            jumpButton.x = position2;
            break;
    }
}
function motion(){
    // Player Motion Logic
    if(movingLeft){
        bird.body.velocity.x = -250;
        if(!facingLeft){
            bird.scale.x *= -1;
            facingLeft = true;
        }
    }
    if(movingRight){
        bird.body.velocity.x = 250;
        if(facingLeft){
            bird.scale.x *= -1;
            facingLeft = false;
        }
    }
}
function keyboardControls(){
    if(touchControls == false){
        // Keyboard Motion
        if (cursors.left.isDown)
        {
            movingLeft = true;
            movingRight = false;
            if(!facingLeft){
                bird.scale.x *= -1;
                facingLeft = true;
            }
        }
        if(cursors.left.isUp){
            movingLeft = false;
        }
        if (cursors.right.isDown)
        {
            movingRight = true;
            movingLeft = false;
            if(facingLeft){
                bird.scale.x *= -1;
                facingLeft = false;
            }
        }
        if(cursors.right.isUp){
            movingRight = false;
        }
        if (jumpKey.isDown && (bird.body.onFloor() || bird.body.touching.down))
        {
            bird.body.velocity.y = -400;
        }
    }
}
function rightDown(){
    movingLeft = false;
    movingRight = true;
}
function rightUp(){
    movingRight = false;
}
function leftDown(){
    movingLeft = true;
    movingRight = false;
}
function leftUp(){
    movingLeft = false;
}
function jumpClick(){
    if(bird.body.onFloor() || bird.body.touching.down) {
        bird.body.velocity.y = -400;
    }
}
function generatePlatforms(){
    platforms = game.add.physicsGroup();
    //length
   //200
   var l1 = game.world.width / 6;
   //500
   var l2 = game.world.width / 2.4;
   //300
   var l3 = game.world.width / 4;
   //1250
   var l4 = game.world.width;
   //16
   var l5 = game.world.width / 75;


   //y coordinates
   //100
   var h1 = game.world.height / 4.4;
   //250
   var h2 = game.world.height / 2.2;
   //345ish
   var h3 = game.world.height / 1.88;
   //400
   var h4 = game.world.height / 1.7;
   //500
   var h5 = game.world.height / 1.3;

   //x coordinates
   //900
   var w1 = ( game.world.width / 4 ) * 3;
   //500
   var w2 = game.world.width / 2.4;
   //100
   var w3 = game.world.width / 12;
   //850
   var w4 = game.world.width / 1.4;
   //800
   var w5 = (game.world.width / 3) * 2;
   //25
   var w6 = game.world.width / 48;

   //platform height
   //16
   var ph1 = game.world.height / 40.625;
   //50
   var ph2 = game.world.height / 13;

   //TOP 3 PLATFORMS
   var pSprite = game.add.sprite(w1, h1, 'cloud1');
   pSprite.width = l1; pSprite.height = ph1;
   platforms.add(pSprite);

   pSprite = game.add.sprite(w2, h1, 'cloud1');
   pSprite.width = l1; pSprite.height = ph1;
   platforms.add(pSprite);

   pSprite = game.add.sprite(w3, h1, 'cloud1');
   pSprite.width = l1; pSprite.height = ph1;
   platforms.add(pSprite);

   //platform on right below top 3
   pSprite = game.add.sprite(game.world.width - l1, h2, 'cloud1');
   pSprite.width = l1; pSprite.height = ph1;
   platforms.add(pSprite);

   //platform on left below
   pSprite = game.add.sprite(0, h2, 'cloud1');
   pSprite.width = l1; pSprite.height = ph1;
   platforms.add(pSprite);

   //platform on right above ground
   //pSprite = game.add.sprite(w5, h4, 'platform');
   //pSprite.width = l2; pSprite.height = ph1;
   //platforms.add(pSprite);

   //middle bottom platform
   pSprite = game.add.sprite((game.world.width / 2) - (l2 / 2), h4, 'cloud1');
   pSprite.width = l2; pSprite.height = ph1;
   platforms.add(pSprite);

   //ground
   pSprite = game.add.sprite(0, h5, 'grassFloor');
   pSprite.width = l4; pSprite.height = ph2;
   platforms.add(pSprite);

   platforms.setAll('body.immovable', true);
}
function generatePlayer(){
    bird = game.add.sprite(200, 400, 'bird');
    bird.width = 0.75 * bird.width;
    bird.height = 0.75 * bird.height;
    bird.anchor.setTo(0.5, 0.5);
    bird.animations.add('flap', [4,5,6,7,]);
    bird.animations.play('flap', 10, true);
    game.physics.arcade.enable(bird);
    bird.body.collideWorldBounds = true;
    bird.body.gravity.y = 500;
    bird.scale.setTo(0.75);
}
function generateEnemy(){
    enemy = enemies.create(100, 100, 'rock');
    enemy.animations.add('yell');
    enemy.animations.play('yell', 12, true);
    game.physics.arcade.enable(enemy);
    enemy.body.gravity.y = 500;
    enemy.scale.setTo(1.2);
    enemy.body.velocity.x = game.rnd.integerInRange(-100,100);
}
