
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {

    game.stage.backgroundColor = '#85b5e1';

    game.load.baseURL = 'http://examples.phaser.io/assets/';
    game.load.crossOrigin = 'anonymous';

    game.load.image('player', 'sprites/phaser-dude.png');
    game.load.image('platform', 'sprites/platform.png');
    game.load.image('arrow', 'sprites/arrow.png');
    game.load.image('orb', 'sprites/orb-green.png');

}

var player;
var platforms;
var cursors;
var jumpButton;
var leftButton;
var rightButton;
var position1 = 50;
var position2 = 200;
var position3 = 600;
var randomInterval;
var timeElapsed;
var buttonState;
var movingLeft;
var movingRight;


function create() {

    player = game.add.sprite(100, 200, 'player');

    game.physics.arcade.enable(player);

    player.body.collideWorldBounds = true;
    player.body.gravity.y = 500;

    platforms = game.add.physicsGroup();

    platforms.create(500, 150, 'platform');
    platforms.create(0, 300, 'platform');

    platforms.setAll('body.immovable', true);

    cursors = game.input.keyboard.createCursorKeys();
    jumpKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    // Buttons
    rightButton = game.add.button(200,  game.world.height - 150, 'arrow', null, this);
    rightButton.scale.setTo(2,2);
    rightButton.onInputDown.add(rightDown, this);
    rightButton.onInputUp.add(rightUp, this);

    leftButton = game.add.button(50 ,  game.world.height - 150, 'arrow', null, this)
    leftButton.anchor.setTo(1,1);
    leftButton.angle = 180;
    leftButton.scale.setTo(2,2);
    leftButton.onInputDown.add(leftDown, this);
    leftButton.onInputUp.add(leftUp, this);

    jumpButton = game.add.button(600, game.world.height - 150, 'orb', jumpClick, this);
    jumpButton.scale.setTo(4,4);

    randomInterval = game.rnd.integerInRange(300,800);
    timeElapsed = 0;
    buttonState = 0;
    movingLeft = false;
    movingRight = false;
}

function update() {

    game.physics.arcade.collide(player, platforms);
    player.body.velocity.x = 0;

    timeElapsed++;
    if(timeElapsed > randomInterval){
        randomInterval = game.rnd.integerInRange(300,800);
        timeElapsed = 0;
        buttonState = game.rnd.integerInRange(0,2);
    }

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

    if(movingLeft){
        player.body.velocity.x = -250;
    }
    if(movingRight){
        player.body.velocity.x = 250;
    }

    // Keyboard Motion
    if (cursors.left.isDown)
    {
        player.body.velocity.x = -250;
    }
    else if (cursors.right.isDown)
    {
        player.body.velocity.x = 250;
    }

    if (jumpKey.isDown && (player.body.onFloor() || player.body.touching.down))
    {
        player.body.velocity.y = -400;
    }
}

function rightDown(){
    movingRight = true;
    movingLeft = false;
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
    if(player.body.onFloor() || player.body.touching.down) {
        player.body.velocity.y = -400;
    }
}