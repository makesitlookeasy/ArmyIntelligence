var touchControls = false;

var optionsState = {
    create: function(){
        background = game.add.sprite(0, 0, 'menuBackground');
    },
    exit: function(){
        game.state.start('menu');
    },
};