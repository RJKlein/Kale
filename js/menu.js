var menuState = {
    create: function() {
        if (!game.device.desktop){ game.input.onDown.add(function() { game.scale.startFullScreen(false);}); } //go fullscreen on mobile devices
        
        //	A simple background for our menu
        game.add.sprite(0, 0, 'sky');
        this.themeSound = game.add.audio('theme');
        this.themeSound.loop = true;
        this.blink = game.add.audio('blink');
        
        // create the player sprite and enable physics
        this.player = game.add.sprite(550, 256, 'player');
        this.player.scale.setTo(-1, 1);
        this.player.anchor.setTo(.5, .5);
        this.player.angle = 38;
        
        // add the blinking animation as a play only once (last parameter is set to false for play once)
        this.player.animations.add('idle', ['green_idle_1', 'green_idle_2', 'green_idle_3', 'green_idle_2', 'green_idle_1'], 10, false);
        this.player.animations.play('idle');
        
        //  Enables all kind of input actions on this image (click, etc)
        this.player.inputEnabled = true;
        this.player.events.onInputDown.add(this.listener, this);
   
        // place game title on menu screen
        var nameLabel = game.add.text(260, 20, 'THE', { font: '50px Comic Sans MS', fill: '#ffffff' });
        var name1Label = game.add.text(40, 80, 'ADVENTURES OF KALE', { font: '50px Comic Sans MS', fill: '#ffffff' });
        
        // place menu instructions on menu screen
        var start1Label = game.add.text(80, 160, 'SINGLE PLAYER', { font: '40px Comic Sans MS', fill: '#ffffff' });
        var start2Label = game.add.text(80, 240, 'MULTIPLAYER', { font: '40px Comic Sans MS', fill: '#ffffff' });
        
        // Enable events on the two labels
        start1Label.inputEnabled = true;
        start2Label.inputEnabled = true;
        
        // add theme music
        this.themeSound.play();   
        this.themeSound.onLoop.add(this.playAgain, this);


        start1Label.events.onInputDown.addOnce(this.start, this);
        start2Label.events.onInputDown.addOnce(this.start, this);
         
        //	Timer event to give motion and activity every 1/4 second to Kane for Main menu
        game.time.events.loop(Phaser.Timer.SECOND/4, this.actionTime, this);       
        
        },

    listener: function() {
        if (!this.blink.isPlaying) {       
            this.player.animations.play('idle');
            this.blink.play();
        }
    },

        
    // start function calls the play state based on the key that was pressed
    start: function(item) {
        this.themeSound.stop();
        switch(item.text) {
            case 'SINGLE PLAYER':
                game.state.start('play');
                break;
            case 'MULTIPLAYER':
                game.state.start('play1');
                break;
            default:
                game.state.start('play1');
        }     
    },
    
    playAgain: function() {
        this.themeSound.play();
    },
    
    // function to give life to menu screen
    actionTime: function() {
        
        // randomly add to left right rotation
        this.player.angle += ((Math.random() * 2) - 1);
        
        // 5% of the events should cause Kane to blink(play 1 full reel of the idle animation)
        if (!this.blink.isPlaying && (Math.random() * 100) > 95)
        {       
        this.player.animations.play('idle');
        this.blink.play();
        }
    }
};