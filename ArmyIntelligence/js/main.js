
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {

    game.stage.backgroundColor = '#85b5e1';

    game.load.baseURL = 'http://examples.phaser.io/assets/';
    game.load.crossOrigin = 'anonymous';

    game.load.image('player', 'sprites/phaser-dude.png');
    game.load.image('platform', 'sprites/platform.png');
    game.load.image('arrow', 'sprites/arrow.png');

}

var player;
var platforms;
var cursors;
var jumpButton;
var leftButton;
var rightButton;

function create() {

    player = game.add.sprite(100, 200, 'player');

    game.physics.arcade.enable(player);

    player.body.collideWorldBounds = true;
    player.body.gravity.y = 500;

    platforms = game.add.physicsGroup();

    platforms.create(500, 150, 'platform');
    platforms.create(-200, 300, 'platform');
    platforms.create(400, 450, 'platform');

    platforms.setAll('body.immovable', true);

    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    rightButton = game.add.button(200,  game.world.height - 150, 'arrow', rightClick, this);
    rightButton.scale.setTo(2,2);
    leftButton = game.add.button(100,  game.world.height - 150, 'arrow', leftClick, this)
    leftButton.anchor.setTo(0.5,0.5);
    leftButton.angle + 5;
    leftButton.scale.setTo(2,2);
}

function update() {

    game.physics.arcade.collide(player, platforms);
    player.body.velocity.x = 0;

    if (cursors.left.isDown)
    {
        player.body.velocity.x = -250;
    }
    else if (cursors.right.isDown)
    {
        player.body.velocity.x = 250;
    }

    if (jumpButton.isDown && (player.body.onFloor() || player.body.touching.down))
    {
        player.body.velocity.y = -400;
    }
}

function rightClick(){

}

function leftClick(){

}