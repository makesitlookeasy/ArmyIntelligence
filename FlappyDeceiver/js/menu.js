var music;
var coinSound;
var musicPlaying = false;

var menuState = {
    create: function(){
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        background = game.add.sprite(0, 0, 'menuBackground');

        title = game.add.sprite(game.width/2 - game.cache.getImage('title').width/2, 50,'title');

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

        if(!musicPlaying){
            musicPlaying = true;
            music = game.add.audio('music');
            music.onLoop.add(playMusic, this);
            music.play('', 0, 1, true);
        }
        coinSound = game.add.audio('coinPickup');

        var helpx = game.width/2 - game.cache.getImage('blankButton').width/2;
        var helpy = game.height/2 + game.cache.getImage('options').height + game.cache.getImage('blankButton').height;
        helpButton = game.add.button(helpx,helpy,'blankButton', null, this);
        helpButton.onInputDown.add(helpClick, this);
        helpButton.onInputUp.add(helpRelease, this);
    }
};

function playMusic(){
    music.play('', 0, 1, true);
}

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
function helpClick(){
    helpButton.loadTexture('blankButtonPressed', 0);
}
function helpRelease(){
    game.state.start('help');
}
