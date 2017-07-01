var winState = {
    create: function() {
        
        //	A simple background for our menu
        game.add.sprite(0, 0, 'gameover');
        
        // place restart instructions on menu screen
        var startLabel = game.add.text(300, game.world.height-60, 'press CLICK for MENU', { font: '25px Arial', fill: '#ffffff' });

		//	the "click to restart" handler
		game.input.onTap.addOnce(this.restart,this); 
    },
    
    // start function calls the paly state
    restart: function() {
        game.state.start('menu');
    }
};