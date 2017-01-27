var useText;
var left_right_jump;
var birdText;
var coinsText;
var highScoreText;
var enemyText;
var controlSwitchText;

var helpState = {
    create: function(){
        background = game.add.sprite(0, 0, 'menuBackground');

        //horizontal line
          line = game.add.sprite(-200, game.height/2 - game.cache.getImage('line').height - 50, 'line');
          line.scale.set(2);

          //vertical line
          // vline = game.add.sprite(game.width/2, 0, 'line');
          // vline.anchor.setTo(1,1);
          // vline.angle = 90;
          // vline.scale.set(2);


        var backx = game.width/2 - game.cache.getImage('start').width/2;
        var backy = game.height/2 + 2 * game.cache.getImage('start').height;
        backButton = game.add.button(backx, backy, 'back', null, this);
        backButton.onInputDown.add(backClick, this);
        backButton.onInputUp.add(backRelease, this);

        //checkmark = game.add.sprite(600, 80, 'checkmark');
      //  checkmark.scale.set(0.5);

      //top 3 arrows
        arrow = game.add.sprite(0 + game.cache.getImage('arrow').width * 1.5, 0, 'arrow');
        arrow.anchor.setTo(1,1);
        arrow.angle = 180;

        arrow1 = game.add.sprite(0 + game.cache.getImage('arrow').width * 2.5 + 10, 0, 'arrow');

        orb = game.add.sprite(0 + game.cache.getImage('arrow').width * 3.5 + 20, 0, 'orb');
        orb.scale.set(2);

        //Use text
        useText = game.add.bitmapText(5, 5, 'gem', 'Use: ', 40);

        //left right jumpButton
        left_right_jump = game.add.bitmapText(100, 50, 'gem', 'Left   Right  Jump', 20);

        bird = game.add.sprite(175, 140, 'bird');
        bird.anchor.setTo(0.5, 0.5);
        bird.animations.add('flap', [4,5,6,7]);
        bird.animations.play('flap', 10, true);

        //bird text
        birdText = game.add.bitmapText(25, 175, 'gem', 'to control the bird', 32);

        //Collect coins text
        coinsText = game.add.bitmapText(game.width/2 + 100, 5, 'gem', 'Collect Coins,', 32);

        //coin
        coin = game.add.sprite(game.width * 0.75, 75, 'coin');
        coin.animations.add('spin');
        coin.animations.play('spin',12,true);

        //cloud
        cloud = game.add.sprite(game.width * 0.75 - (game.cache.getImage('cloud2').width / 2.25), 75 + game.cache.getImage('coin').height, 'cloud2');

        //High score text
        highScoreText = game.add.bitmapText(game.width/2 + 100, 75 + game.cache.getImage('cloud2').height * 2, 'gem', 'get the high score!', 32);

        //Enemy text
        enemyText = game.add.bitmapText(10, game.height/2 , 'gem', 'Careful! Avoid the enemies!', 32);

        //enemy
        bird2 = game.add.sprite(game.width/4 - game.cache.getImage('bird2').width / 4, game.height/1.5, 'bird2');
        bird2.anchor.setTo(0.5,0.5);
        bird2.animations.add('flap', [24,25,26,27]);
        bird2.animations.play('flap', 10, true);

        //control switch text
        controlSwitchText = game.add.bitmapText(game.width/2 + 50, game.height/2 , 'gem', 'Controls switch at random!', 32);

        //v1
        startWidth = game.width/2 + 100;
        startHeight = game.height/2 + 50;
        arrow2 = game.add.sprite(startWidth + game.cache.getImage('arrow').width * 1.5, startHeight, 'arrow');
        arrow2.anchor.setTo(1,1);
        arrow2.angle = 180;

        arrow3 = game.add.sprite(startWidth + game.cache.getImage('arrow').width * 2.5 + 10, startHeight, 'arrow');

        orb1 = game.add.sprite(startWidth + game.cache.getImage('arrow').width * 3.5 + 20, startHeight, 'orb');
        orb1.scale.set(2);

        down = game.add.sprite(startWidth + game.cache.getImage('arrow').width * 2.5, startHeight + 75, 'down');
        down.scale.set(0.25);
        //v2

        startWidth = game.width/2 + 100;
        startHeight = game.height/2 + 50 + game.cache.getImage('arrow').height * 3.5;


        arrow4 = game.add.sprite(startWidth + game.cache.getImage('arrow').width * 2.5 + 10, startHeight, 'arrow');
        arrow4.anchor.setTo(1,1);
        arrow4.angle = 180;

        arrow5 = game.add.sprite(startWidth + game.cache.getImage('arrow').width * 3.5 + 20, startHeight, 'arrow');

        orb2 = game.add.sprite(startWidth + game.cache.getImage('arrow').width * 1.5 , startHeight, 'orb');
        orb2.scale.set(2);
    }
};

function backClick(){
    backButton.loadTexture('backPressed', 0);
}
function backRelease(){
    game.state.start('menu');
  }
