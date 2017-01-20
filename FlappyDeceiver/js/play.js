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
var position2 = 250;
var position3 = 800;
var buttonState;

// Timing Vars
var randomInterval;
var timeElapsed;
var enemyFlipInterval = 400;
var enemyFlipTimeElapsed = 0;

// Motions Vars
var movingLeft;
var movingRight;
var facingLeft;

// UI Vars
var score;
var scoreText;

var playState = {
    create: function(){
        game.physics.setBoundsToWorld();
        generatePlayer();
        enemies = game.add.physicsGroup();
        generateEnemy();
        generatePlatforms();

        // Keyboard Input
        cursors = game.input.keyboard.createCursorKeys();
        jumpKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        // Buttons
        // Right Button
        rightButton = game.add.button(position2,  game.world.height - 120, 'arrow', null, this);
        rightButton.scale.setTo(2,2);
        rightButton.onInputDown.add(rightDown, this);
        rightButton.onInputUp.add(rightUp, this);
        // Left Button
        leftButton = game.add.button(position1 ,  game.world.height - 120, 'arrow', null, this)
        leftButton.anchor.setTo(1,1);
        leftButton.angle = 180;
        leftButton.scale.setTo(2,2);
        leftButton.onInputDown.add(leftDown, this);
        leftButton.onInputUp.add(leftUp, this);
        // Jump Button
        jumpButton = game.add.button(position3, game.world.height - 120, 'orb', jumpClick, this);
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
        enemyFlipTimeElapsed++;
        moveButtons();
        buttonPosition();
        motion();
        keyboardControls();
        flipEnemies();
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
    platform1 = platforms.create(0, 450, 'grassFloor');
    platform2 = platforms.create(70, 300, 'cloud1');
    platform2.scale.setTo(0.6, 0.5);
    platform3 = platforms.create(400, 150, 'cloud1');
    platform3.scale.setTo(0.6, 0.5);
    platforms.setAll('body.immovable', true);
}
function generatePlayer(){
    bird = game.add.sprite(200, 400, 'bird');
    bird.anchor.setTo(0.5, 0.5);
    bird.animations.add('flap', [4,5,6,7,]);
    bird.animations.play('flap', 10, true);
    game.physics.arcade.enable(bird);
    bird.body.collideWorldBounds = true;
    bird.body.gravity.y = 500;
    bird.scale.setTo(0.75);
}
function generateEnemy(){
    enemySpeed = 50;
    enemy = enemies.create(100, 0, 'rock');
    enemy.animations.add('yell');
    enemy.animations.play('yell', 12, true);
    enemy.checkWorldBounds = true;
    enemy.events.onOutOfBounds.add(enemyOut, this);
    game.physics.arcade.enable(enemy);
    enemy.body.gravity.y = 500;
    enemy.scale.setTo(1.2);
    r = game.rnd.between(0,1);
    if(r){
        enemy.body.velocity.x = enemySpeed;
    }
    else{
        enemy.body.velocity.x = -enemySpeed;
    }
}

function flipEnemies(){
    if(enemyFlipTimeElapsed > enemyFlipInterval){
        enemies.forEach(function(enemy){
           enemy.body.velocity.x *= -1;
        })
        enemyFlipTimeElapsed = 0;
    }
}

function enemyOut(enemy){
    enemy.kill();
    generateEnemy();
}