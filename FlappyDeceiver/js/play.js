// Physics Objects
var bird;
var platforms;
var enemies;
var coins;

// Button Vars
var cursors;
var jumpButton;
var leftButton;
var rightButton;
var position1 = 50;
var position2 = 250;
var position3 = 800;
var buttonState = 0;

// Timing Vars
var randomInterval;
var timeElapsed = 0;

// Motions Vars
var movingLeft = false;
var movingRight = false;
var facingLeft;

// UI Vars
var score;
var scoreText;

var isPaused = false;

var playState = {
    create: function(){
        game.physics.setBoundsToWorld();
        enemies = game.add.physicsGroup();
        coins = game.add.physicsGroup();
        generateEnemy();
        generatePlatforms();
        generateButtons();
        generatePlayer();
        generateCoins();
        score = 0;
        facingLeft = true;
        randomInterval = game.rnd.integerInRange(300,800);
        scoreText = game.add.bitmapText(0, 0, 'bubble', 'SCORE: ', 32);
    },

    update: function(){

        game.physics.arcade.collide(bird, platforms);
        game.physics.arcade.collide(coin, platforms);
        game.physics.arcade.collide(coin, bird, collectCoin);
        game.physics.arcade.collide(enemies, platforms);
        game.physics.arcade.collide(bird, enemies, gameOver);
        game.physics.arcade.collide(enemies, enemies);
        game.physics.arcade.collide(coins, platforms);

        if(!isPaused){
            score++;
            scoreText.text = 'SCORE: ' + score;
            if(score % 500 == 0){
                generateEnemy();
            }
            bird.body.velocity.x = 0;
            timeElapsed++;
            buttonPosition();
            keyboardControls();
            moveButtons();
            motion();
            flipEnemies();
            enemyFadeIn();
        }

        //slideCloud(cloud4);
        //slideCloud(cloud5);
    }
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
function generateButtons(){
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
    jumpButton = game.add.button(position3, game.world.height - 120, 'orb', null, this);
    jumpButton.onInputDown.add(jumpClick, this);
    jumpButton.scale.setTo(4,4);

    pauseButton = game.add.button(game.world.width - 70, game.world.height - (game.world.height - 20), 'orb', null, this);
    pauseButton.scale.setTo(.5,.5);
    pauseButton.onInputUp.add(pauseClick, this);
}
function generatePlatforms(){
    platforms = game.add.physicsGroup();

    var height1 = game.height/2;
    var height2 = 150;
    var width1 = game.cache.getImage('cloud2').width/2;
    var width2 = game.width - game.cache.getImage('cloud2').width*1.5;
    var width3 = (width1 + width2) / 2;

    cloud1 = game.add.sprite(width1, height1, 'cloud2');
    cloud2 = game.add.sprite(width2, height1, 'cloud2');
    cloud3 = game.add.sprite(width3, height1, 'cloud2');
    cloud4 = game.add.sprite((width1 + width3) / 2, height2, 'cloud2');
    cloud4.movingLeft = true;

    cloud5 = game.add.sprite((width2 + width3) / 2, height2, 'cloud2');

    platforms.add(cloud1);
    platforms.add(cloud2);
    platforms.add(cloud3);
    platforms.add(cloud4);
    platforms.add(cloud5);

    ground = game.add.sprite(0, 450, 'grassFloor');
    platforms.add(ground);

    platforms.setAll('body.immovable', true);
}
function generateCoins(){
    dropPoint = game.rnd.between(100,900);
    coin = coins.create(dropPoint, -50, 'coin');
    coin.animations.add('spin');
    coin.animations.play('spin',12,true);
    game.physics.arcade.enable(coin);
    coin.body.gravity.y = 500;
}
function generatePlayer(){
    bird = game.add.sprite(200, 400, 'bird');
    bird.anchor.setTo(0.5, 0.5);
    bird.animations.add('flap', [4,5,6,7]);
    bird.animations.play('flap', 10, true);
    game.physics.arcade.enable(bird);
    bird.body.collideWorldBounds = true;
    bird.body.gravity.y = 500;
    bird.scale.setTo(0.75);
}
function generateEnemy(){
    dropPoint = game.rnd.between(100,900);
    enemy = enemies.create(dropPoint, 0, 'bird2');
    enemy.animations.add('flap', [24,25,26,27]);
    enemy.animations.play('flap', 10, true);
    enemy.facingLeft = true;
    enemy.anchor.setTo(0.5, 0.5);
    enemy.scale.setTo(0.75);
    game.physics.arcade.enable(enemy);
    enemy.body.collideWorldBounds = true;
    enemy.body.bounce.setTo(1,1);
    velx = game.rnd.between(100,200);
    vely = game.rnd.between(100,200);
    enemy.body.velocity.setTo(velx,vely);

    enemy.collisionActive = false;
    enemy.alpha = 0;

}
function flipEnemies(){
    enemies.forEach(function(enemy){
        if(enemy.facingLeft){
            if(enemy.body.velocity.x > 0){
                enemy.scale.x *= -1;
                enemy.facingLeft = false;
            }
        }
        else{
            if(enemy.body.velocity.x < 0){
                enemy.scale.x *= -1;
                enemy.facingLeft = true;
            }
        }
    })
}
function gameOver(bird, enemy){
    if(enemy.collisionActive){
        game.state.start('gameover');
    }
}
function collectCoin(coin, bird){
    coin.kill();
    coinSound.play();
    score += 500;
    generateCoins();
}
function enemyFadeIn(){
    enemies.forEach(function(enemy){
        if(enemy.alpha < 1){
            enemy.alpha += 0.01;
        }
        if(enemy.alpha >= 1){
            enemy.collisionActive = true;
        }
    })
}

function pauseClick(){
    isPaused = !isPaused;
    if (isPaused){
        pauseButton.destroy();
        pauseButton = game.add.button(game.world.width - 70, game.world.height - (game.world.height - 20), 'play', null, this);
        pauseButton.scale.setTo(.45,.45);
        pauseButton.onInputUp.add(pauseClick, this);
        //enemies.body.velocity.setTo(0,0);
        bird.body.velocity.setTo(0,0);
        bird.body.gravity.y = 0;
        pauseEnemy();
        pauseMenu();
    }
    else if (!isPaused){
        pauseButton.destroy();
        pauseButton = game.add.button(game.world.width - 70, game.world.height - (game.world.height - 20), 'pause', null, this);
        pauseButton.scale.setTo(.5,.5);
        pauseButton.onInputUp.add(pauseClick, this);
        menuButton.destroy();
        audioButton.destroy();
        bird.body.gravity.y = 500;
        unpauseEnemy();
    }
}
function pauseMenu(){
    var menux = game.width/2 - game.cache.getImage('blankButton').width/2;
    var menuy = game.height/2;

    menuButton = game.add.button(menux, menuy, 'blankButton', null, this);
    menuButton.onInputDown.add(menuClick, this);
    menuButton.onInputUp.add(menuRelease, this);
    if(audioOn){
        audioButton = game.add.button(game.width - 125, game.height - 125, 'soundOn', null, this);
    }
    else{
        audioButton = game.add.button(game.width - 125, game.height - 125, 'soundOff', null, this);
    }
    audioButton.scale.setTo(0.25);
    audioButton.onInputUp.add(audioRelease, this);

}
function menuClick(){
    menuButton.loadTexture('blankButtonPressed', 0);
}
function menuRelease(){
    game.state.start('menu');
}
function pauseEnemy(){
    enemies.forEach(function(enemy){
        enemy.body.velocity.setTo(0,0);
    })
}
function unpauseEnemy(){
    enemies.forEach(function(enemy){
        enemy.body.velocity.setTo(velx,vely);
    })
}


function slideCloud(cloud){
    if(cloud.body.x < game.cache.getImage('cloud2').x){
        cloud.movingLeft = false;
    }
    if(cloud.body.x > (game.width - game.cache.getImage('cloud2').width)){
        cloud.movingLeft = true;
    }
    if(cloud.movingLeft){
        cloud.body.x += -1;
    }
    else{
        cloud.body.x += 1;
    }
}