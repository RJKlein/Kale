var winState = {
    create: function() {
        
        // place game title on menu screen
        var nameLabel = game.add.text(80, 80, 'YOU WON!', { font: '50px Arial', fill: '#00ff00' });
        
        // place restrt instructions on menu screen
        var startLabel = game.add.text(80, game.world.height-80, 'press CLICK for MENU', { font: '25px Arial', fill: '#ffffff' });

		//	the "click to restart" handler
		game.input.onTap.addOnce(this.restart,this); 
    },
    
    // start function calls the paly state
    restart: function() {
        game.state.start('menu');
    }
};