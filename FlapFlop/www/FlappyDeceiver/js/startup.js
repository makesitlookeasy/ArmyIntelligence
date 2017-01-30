/**
 * Created by kennyrosenberg on 1/19/17.
 */
var game = new Phaser.Game(1000, 600, Phaser.AUTO, 'GAME TITLE HERE');

game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('options', optionsState);
game.state.add('play', playState)
game.state.add('gameover', gameoverState);
//game.state.add('why', whyState);

game.state.start('boot');
