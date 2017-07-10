var winState = {
    create: function() {
        
        //	A simple background for our menu
        this.backGround = game.add.sprite(0, 0, 'gameover');
        
        // place restart instructions on menu screen
        var startLabel = game.add.text(300, game.world.height-60, 'Touch for MENU', { font: '25px Arial', fill: '#ffffff' });
        this.gameoversound = game.add.audio('gameoversound');
        this.gameoversound.play();    

		//	the "space or touch to restart" handler
        this.backGround.inputEnabled = true;
        this.backGround.events.onInputDown.addOnce(this.restart, this);
    },
    
    // start function calls the play state
    restart: function() {
        this.gameoversound.stop();    
        game.state.start('menu');
    }
};