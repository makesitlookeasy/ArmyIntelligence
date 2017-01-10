
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('orb-blue', 'assets/sprites/orb-blue.png', 32, 32);
    game.load.image('orb-red', 'assets/sprites/orb-red.png', 32, 32);

}

var reds;
var blues;

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    reds = game.add.group();
    blues = game.add.group();
    reds.enableBody = true;
    blues.enableBody = true;

    for(i = 0; i < 5; i++){
        var red = reds.create(game.world.randomX, game.world.randomY, 'orb-red');
        var blue = blues.create(game.world.randomX, game.world.randomY, 'orb-blue');
    }

    /*
    red = game.add.sprite(100, 100, 'orb-red');
    game.physics.enable(red, Phaser.Physics.ARCADE);
    blue = game.add.sprite(400, 300, 'orb-blue');
    game.physics.enable(blue, Phaser.Physics.ARCADE);
    blue.body.velocity.setTo(game.rnd.integerInRange(-50,50), game.rnd.integerInRange(-50,50));
    */
}

function update() {

        reds.forEach(game.physics.arcade.moveToPointer, game.physics.arcade, false);

    /*
    game.physics.arcade.moveToObject(red, blue, 50, 500);
    if(game.physics.arcade.distanceBetween(red, blue) < 25){
        game.stage.backgroundColor = Phaser.Color.getRandomColor(50, 255, 255);
    }
    */
}

function moveToNearestEnemy(){

}