var whyText;
var descripText1;
var descripText2;
var descripText3;
var descripText4;
var descripText5;
var btext;

var whyState = {
    create: function(){
        background = game.add.sprite(0, 0, 'menuBackground');

        var backx = game.width/2 - game.cache.getImage('start').width/2;
        var backy = game.height/2 + game.cache.getImage('start').height;
        backButton2 = game.add.button(backx, backy, 'blankButton', null, this);
        backButton2.onInputDown.add(backClick2, this);
        backButton2.onInputUp.add(backRelease2, this);
        btext = game.add.bitmapText(backx + 80, backy + game.cache.getImage('blankButton').height/4, 'bubble', 'Back', 40);

        whyText = game.add.bitmapText(100,50,'bubble','Why play FlapFlop?',20);
        descripText1 = game.add.bitmapText(100, 150, 'bubble','This game is modeled after the Deceiver in ',20);
        descripText2 = game.add.bitmapText(100, 180, 'bubble','the Computer Science Field Guide, and is',20);
        descripText3 = game.add.bitmapText(100, 210, 'bubble','designed to game-ify the idea of keeping ',20);
        descripText4 = game.add.bitmapText(100, 240, 'bubble','your interfacing consistant and meeting ',20);
        descripText5 = game.add.bitmapText(100, 270, 'bubble','expectations.',20);
    }
};

function backClick2(){
    backButton2.loadTexture('blankButtonPressed', 0);
}
function backRelease2(){
    game.state.start('options');
}
