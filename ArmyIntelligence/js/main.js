
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {

    game.stage.backgroundColor = '#85b5e1';

    game.load.image('platform', 'assets/sprites/platform.png');
    game.load.image('grassFloor', 'assets/sprites/grassFloor.png');
    game.load.image('grassPlatform', 'assets/sprites/grassPlatform.png');
    game.load.image('arrow', 'assets/sprites/arrow.png');
    game.load.image('orb', 'assets/sprites/orb-green.png');

    game.load.spritesheet('bird', 'assets/sprites/birds.png', 64, 64, 8);

    game.load.bitmapFont('gem', 'assets/fonts/bitmapFonts/gem.png', 'assets/fonts/bitmapFonts/gem.xml');

}

// Physics Objects
var bird;
var platforms;

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
var touchControls;


function create() {

    // Player Sprite
    bird = game.add.sprite(50, 200, 'bird');
    bird.anchor.setTo(0.5, 0.5);
    bird.animations.add('flap', [4,5,6,7,]);
    bird.animations.play('flap', 10, true);
    game.physics.arcade.enable(bird);
    bird.body.collideWorldBounds = true;
    bird.body.gravity.y = 500;

    // Platforms
    platforms = game.add.physicsGroup();
    platform1 = platforms.create(0, 450, 'grassFloor');
    platform2 = platforms.create(50, 300, 'grassPlatform');
    platforms.setAll('body.immovable', true);

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
    touchControls = false;
}

function update() {

    score++;
    scoreText.text = 'SCORE: ' + score;
    game.physics.arcade.collide(bird, platforms);
    bird.body.velocity.x = 0;
    timeElapsed++;
    moveButtons();
    buttonPosition();
    motion();
    keyboardControls();
}

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

