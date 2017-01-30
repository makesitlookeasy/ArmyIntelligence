var loadState = {
    preload: function(){
        game.stage.backgroundColor = '#85b5e1';

        //game.load.image('platform', 'assets/sprites/platform.png');
        game.load.image('grassFloor', 'assets/sprites/GrassFloor.png');
        game.load.image('cloud1', 'assets/sprites/cloud1.png');
        game.load.image('cloud2', 'assets/sprites/cloud2.png');
        game.load.image('arrow', 'assets/sprites/arrow.png');
        game.load.image('orb', 'assets/sprites/orb-green.png');
        game.load.image('options', 'assets/sprites/OptionsButton.png');
        game.load.image('optionsPressed', 'assets/sprites/OptionsButtonPressed.png');
        game.load.image('start', 'assets/sprites/StartButton.png');
        game.load.image('startPressed', 'assets/sprites/StartButtonPressed.png');
        game.load.image('menuBackground', 'assets/sprites/MenuBackground.png');
        game.load.image('gameOverBackground', 'assets/sprites/GameOverBackground.png');
        game.load.image('title', 'assets/sprites/FlappyDeceiver.png');
        game.load.image('gameOver', 'assets/sprites/GameOver.png');
        game.load.image('back', 'assets/sprites/BackButton.png');
        game.load.image('backPressed', 'assets/sprites/BackButtonPressed.png');
        game.load.image('KeyboardButton', 'assets/sprites/KeyboardButton.png');
        game.load.image('KeyboardButtonPressed', 'assets/sprites/KeyboardButtonPressed.png');

        game.load.image('blankButton', 'assets/sprites/BlankButton.png');
        game.load.image('blankButtonPressed', 'assets/sprites/BlankButtonPressed.png');
        game.load.image('blankButtonRed', 'assets/sprites/BlankButtonRed.png');
        game.load.image('redPressed', 'assets/sprites/BlankButtonPressedRed.png');

        game.load.image('checkmark', 'assets/sprites/checkmark.png');
        game.load.image('xmark', 'assets/sprites/xmark.png');
        game.load.image('line', 'assets/sprites/line.png');
        game.load.image('down', 'assets/sprites/downArrow.png');
        game.load.image('soundOn', 'assets/sprites/soundOn.png');
        game.load.image('soundOff', 'assets/sprites/soundOff.png');

        game.load.spritesheet('bird', 'assets/sprites/birds.png', 64, 64, 32);
        game.load.spritesheet('bird2', 'assets/sprites/birds2.png', 64, 64, 32);
        game.load.spritesheet('coin', 'assets/sprites/coin.png', 32, 32, 6);

        game.load.bitmapFont('gem', 'assets/fonts/bitmapFonts/gem.png', 'assets/fonts/bitmapFonts/gem.xml');
        game.load.bitmapFont('bubble', 'assets/fonts/BubbleFontShadow/font.png', 'assets/fonts/BubbleFontShadow/font.fnt');

        game.load.audio('music', ['assets/sfx/FlapFlopEpic.mp3', 'assets/sfx/FlapFlopEpic.ogg']);
        game.load.audio('coinPickup', ['assets/sfx/CarribeanCoin.mp3', 'assets/sfx/CarribeanCoin.ogg']);
    },

    create: function(){
        game.state.start('menu');
    },
};
