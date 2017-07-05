var menuState = {
    create: function() {
        
        //	A simple background for our menu
        game.add.sprite(0, 0, 'sky');

        // create the player sprite and enable physics
        this.player = game.add.sprite(550, 256, 'player');
        this.player.scale.setTo(-1, 1);
        this.player.anchor.setTo(.5, .5);
        this.player.angle = 38;
        
        // add the blinking animation as a play only once (last parameter is set to false for play once)
        this.player.animations.add('idle', ['green_idle_1', 'green_idle_2', 'green_idle_3', 'green_idle_2', 'green_idle_1'], 10, false);
        this.player.animations.play('idle');
   
        // place game title on menu screen
        var nameLabel = game.add.text(40, 80, 'ADVENTURES OF KALE', { font: '50px Comic Sans MS', fill: '#ffffff' });
        
        // place menu instructions on menu screen
        var start1Label = game.add.text(80, 160, 'SINGLE PLAYER', { font: '40px Comic Sans MS', fill: '#ffffff' });
        var start2Label = game.add.text(80, 240, 'MULTIPLAYER', { font: '40px Comic Sans MS', fill: '#ffffff' });
        var startLabel = game.add.text(80, 520, 'Select number of players to start', { font: '25px Comic Sans MS', fill: '#ffffff' });
        
		//	the keyboard numeric handler
		var oneKey = game.input.keyboard.addKey(Phaser.Keyboard.ONE);
        var twoKey = game.input.keyboard.addKey(Phaser.Keyboard.TWO);
        oneKey.onDown.addOnce(this.start,this);
        twoKey.onDown.addOnce(this.start,this);

        //	Timer event to give motion and activity every 1/4 second to Kane for Main menu
        game.time.events.loop(Phaser.Timer.SECOND/4, this.actionTime, this);       
    },
    
    // start function calls the play state based on the key that was pressed
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
        
        // randomly add to left right rotation
        this.player.angle += ((Math.random() * 2) - 1);
        
        // 5% of the events should cause Kane to blink(play 1 full reel of the idle animation)
        if ((Math.random() * 100) > 95)
        {       
        this.player.animations.play('idle');
        }
    }
};