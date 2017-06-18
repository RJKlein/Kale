var loadState= {
    
    preload: function() {
        
        // add a loading label on screen
        var loadLabel = game.add.text(80, 150, 'loading...',{font: '30px Courier', fill: '#ffffff'});
        
        // load assets
        game.load.image('goal', 'assets/goal.png');
        game.load.atlas('player','assets/spritesheet.png', 'assets/sprites.json');
        
    },
    
    create: function() {
        // Call menu state
        game.state.start('menu');
    }
};