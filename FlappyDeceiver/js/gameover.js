var gbackButton;

var gameoverState = {
    create: function(){

        background = game.add.sprite(0, 0, 'gameOverBackground');

        gameoverText = game.add.bitmapText(150, 100, 'bubble', 'GAME OVER', 90);

        var buttonHeight = game.cache.getImage('blankButton').height;

        var gbackx = game.width/2 - game.cache.getImage('start').width/2;
        var gbacky = game.height/2 + game.cache.getImage('start').height;
        gbackButton = game.add.button(gbackx, gbacky, 'blankButtonRed', null, this);
        gbackButton.onInputDown.add(gbackClick, this);
        gbackButton.onInputUp.add(gbackRelease, this);
        gbText = game.add.bitmapText(gbackx + 80, gbacky + buttonHeight/4, 'bubble', 'Back', 40);

        scoreText = game.add.bitmapText(250, 200, 'bubble', 'SCORE: ', 64);
        scoreText.text = 'SCORE: ' + score;
    }
};

function gbackClick(){
    gbackButton.loadTexture('redPressed', 0);
}
function gbackRelease(){
    game.state.start('menu');
}
