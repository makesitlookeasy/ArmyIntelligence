var whyText;
var descripText;

var whyState = {
    create: function(){
        background = game.add.sprite(0, 0, 'menuBackground');

        var backx = game.width/2 - game.cache.getImage('start').width/2;
        var backy = game.height/2 + game.cache.getImage('start').height;
        backButton2 = game.add.button(backx, backy, 'blankButton', null, this);
        backButton2.onInputDown.add(backClick2, this);
        backButton2.onInputUp.add(backRelease2, this);

        whyText = game.add.bitmapText(100,50,'bubble','Why play FlapFlop?',20);
        descripText = game.add.bitmapText(100, 150, 'bubble','This game is modeled after the Deceiver in the Computer Science Field Guide, and is designed to game-ify the idea of keeping your interfacing consistant and meeting expectations',20);
    }
};

function backClick2(){
    backButton.loadTexture('backPressed', 0);
}
function backRelease2(){
    game.state.start('options');
}
