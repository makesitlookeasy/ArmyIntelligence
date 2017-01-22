
var gameoverState = {
    create: function(){
        background = game.add.sprite(0, 0, 'gameOverBackground');
        var backx = game.width/2 - game.cache.getImage('start').width/2;
        var backy = game.height/2 + game.cache.getImage('start').height;
        backButton = game.add.button(backx, backy, 'back', null, this);
        backButton.onInputDown.add(backClick, this);
        backButton.onInputUp.add(backRelease, this);
    }
};

function backClick(){
    backButton.loadTexture('backPressed', 0);
}
function backRelease(){
    game.state.start('menu');
}
