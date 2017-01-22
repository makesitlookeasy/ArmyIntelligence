
var gameoverState = {
    create: function(){

        background = game.add.sprite(0, 0, 'gameOverBackground');

        gameover = game.add.sprite(game.width/2 - game.cache.getImage('gameOver').width/2, 50,'gameOver');

        var backx = game.width/2 - game.cache.getImage('start').width/2;
        var backy = game.height/2 + game.cache.getImage('start').height;
        backButton = game.add.button(backx, backy, 'back', null, this);
        backButton.onInputDown.add(backClick, this);
        backButton.onInputUp.add(backRelease, this);

        scoreText = game.add.bitmapText(0, 0, 'gem', 'SCORE: ', 64);
        scoreText.text = 'SCORE: ' + score;
    }
};

function backClick(){
    backButton.loadTexture('backPressed', 0);
}
function backRelease(){
    game.state.start('menu');
}
