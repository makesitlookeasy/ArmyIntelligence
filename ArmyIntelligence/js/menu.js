var menuState = {
    create: function(){
        optionsButton = game.add.button(50,50,'options', null, this);
        optionsButton.onInputDown.add(optionsClick, this);
        //this.start();
    },
    start: function(){
        game.state.start('play');
    },
};

function optionsClick(){
    console.log('options');
}