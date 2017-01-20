var menuState = {
    create: function(){
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        background = game.add.sprite(0, 0, 'menuBackground');

        title = game.add.sprite(50,0,'title');

        var startx = game.width/2 - game.cache.getImage('start').width/2;
        var starty = game.height/2;
        startButton = game.add.button(startx, starty, 'start', null, this);
        startButton.onInputDown.add(startClick, this);
        startButton.onInputUp.add(startRelease, this);

        var optionsx = game.width/2 - game.cache.getImage('options').width/2;
        var optionsy = game.height/2 + game.cache.getImage('options').height;
        optionsButton = game.add.button(optionsx,optionsy,'options', null, this);
        optionsButton.onInputDown.add(optionsClick, this);
        optionsButton.onInputUp.add(optionsRelease, this);

    },
    start: function(){
        game.state.start('play');
    },
};

function startClick(){
    startButton.loadTexture('startPressed', 0);
}
function startRelease(){
    game.state.start('play');
}
function optionsClick(){
    optionsButton.loadTexture('optionsPressed',0);
}
function optionsRelease(){
    game.state.start('options');
}
