var winState = {
    create: function() {
        
        //	A simple background for our menu
        game.add.sprite(0, 0, 'gameover');
        
        // place restart instructions on menu screen
        var startLabel = game.add.text(300, game.world.height-60, 'press SpaceBar for MENU', { font: '25px Arial', fill: '#ffffff' });

		//	the "space to restart" handler
        this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.spaceKey.onDown.addOnce(this.restart,this); 
    },
    
    // start function calls the play state
    restart: function() {
        game.state.start('menu');
    }
};