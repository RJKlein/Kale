var menuState = {
    create: function() {
        
        //	A simple background for our menu
        game.add.sprite(0, 0, 'sky');

        // create the player sprite and enable physics
        this.player = game.add.sprite(750, 176, 'player');
        this.player.scale.setTo(-1,1);
        this.player.angle = 38;
        this.player.animations.add('idle', ['green_idle_1', 'green_idle_2', 'green_idle_3', 'green_idle_2', 'green_idle_1'], 10, false);
        this.player.animations.play('idle');

   
        // place game title on menu screen
        var nameLabel = game.add.text(80, 80, 'MENU', { font: '50px Arial', fill: '#ffffff' });
        
        // place menu instructions on menu screen
        var start1Label = game.add.text(80, 160, '1) LEVEL 1&2', { font: '50px Arial', fill: '#ffffff' });
        var start2Label = game.add.text(80, 240, '2) LEVEL 2', { font: '50px Arial', fill: '#ffffff' });
        var startLabel = game.add.text(80, 520, 'Press number key for level to start', { font: '25px Arial', fill: '#ffffff' });
        
		//	the keyboard numeric handler
		var oneKey = game.input.keyboard.addKey(Phaser.Keyboard.ONE);
        var twoKey = game.input.keyboard.addKey(Phaser.Keyboard.TWO);
        
        oneKey.onDown.addOnce(this.start,this);
        twoKey.onDown.addOnce(this.start,this);

        //	The first parameter is how long to wait before the event fires. In this case 1 second (you could pass in 1000 as the value as well.)
        //	The next two parameters are the function to call ('decrementScore') and the context under which that will happen.

        game.time.events.loop(Phaser.Timer.SECOND/4, this.actionTime, this);
        
    },
    
    // start function calls the play state
    start: function(item) {
        switch(item.event.code) {
            case 'Digit1':
                game.state.start('play');
            break;
            case 'Digit2':
                game.state.start('play1');
            break;
            default:
            game.state.start('play1');
        }     
    },
    
    // function to give life to menu screen
    actionTime: function() {
        this.player.angle += ((Math.random() * 2) - 1);
        if ((Math.random() * 100) > 95)
        {       
        this.player.animations.play('idle');
        }
    }
};