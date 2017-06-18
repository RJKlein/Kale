var menuState = {
    create: function() {
        
        // place game title on menu screen
        var nameLabel = game.add.text(80, 80, 'MENU', { font: '50px Arial', fill: '#ffffff' });
        
        // place restart instructions on menu screen
        var startLabel = game.add.text(80, game.world.height-80, 'press CLICK to start', { font: '25px Arial', fill: '#ffffff' });

		//	the "click to restart" handler
		game.input.onTap.addOnce(this.start,this);        
    },
    
    // start function calls the paly state
    start: function() {
        game.state.start('play');
    }
};