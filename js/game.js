// create phaser game 800x600 pixels set third parameter to match the div element defined in index.html
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'gameDiv' );
var game.debugFlag = false;

// Add each state 
game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('play', playState);
game.state.add('play1', play1State);
game.state.add('win', winState);

// Call boot state
game.state.start('boot');

