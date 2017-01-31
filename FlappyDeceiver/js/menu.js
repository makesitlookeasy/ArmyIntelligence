var music;
var coinSound;
var musicPlaying = false;

var menuState = {
    create: function(){
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        background = game.add.sprite(0, 0, 'menuBackground');

        title = game.add.bitmapText(150, 100, 'bubble', 'FLAP FLOP', 90);

        var buttonWidth = game.cache.getImage('blankButton').width;
        var buttonHeight = game.cache.getImage('blankButton').height;

        var startx = game.width/2 - buttonWidth/2;
        var starty = game.height/2 - 60;
        startButton = game.add.button(startx, starty, 'blankButton', null, this);
        startButton.onInputDown.add(startClick, this);
        startButton.onInputUp.add(startRelease, this);
        startText = game.add.bitmapText(startx + 70, starty + buttonHeight/4, 'bubble', 'Start', 40);

        var optionsx = game.width/2 - buttonWidth/2;
        var optionsy = game.height/2 + buttonHeight - 40;
        optionsButton = game.add.button(optionsx,optionsy,'blankButton', null, this);
        optionsButton.onInputDown.add(optionsClick, this);
        optionsButton.onInputUp.add(optionsRelease, this);
        optionsText = game.add.bitmapText(optionsx + 45, optionsy + buttonHeight/4, 'bubble', 'Options', 40);

        var helpx = game.width/2 - buttonWidth/2;
        var helpy = game.height/2 + buttonHeight + buttonHeight - 20;
        helpButton = game.add.button(helpx,helpy,'blankButton', null, this);
        helpButton.onInputDown.add(helpClick, this);
        helpButton.onInputUp.add(helpRelease, this);
        helpText = game.add.bitmapText(helpx + 90, helpy + buttonHeight/4, 'bubble', 'Help', 40);

        if(!musicPlaying){
            musicPlaying = true;
            music = game.add.audio('music');
            music.onLoop.add(playMusic, this);
            music.play('', 0, 1, true);
        }
        coinSound = game.add.audio('coinPickup');

    }
};

function playMusic(){
    music.play('', 0, 1, true);
}

function startClick(){
    startButton.loadTexture('blankButtonPressed', 0);
}
function startRelease(){
    isPaused = false;
    game.state.start('play');
}
function optionsClick(){
    optionsButton.loadTexture('blankButtonPressed',0);
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
