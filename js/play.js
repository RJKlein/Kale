var playState = {
    
    create: function() {
        
        // A simple background for our game
        // game.add.sprite(0, 0, 'sky');
        
        // Our controls.
        cursors = game.input.keyboard.createCursorKeys();
        
        // create the player sprite and enable physics
        this.player = game.add.sprite(16, 256, 'player');
        game.physics.enable(this.player, Phaser.Physics.ARCADE);
        
        // create the goal sprite and enable physics
        this.goal = game.add.sprite(556, 256, 'goal');
        game.physics.enable(this.goal, Phaser.Physics.ARCADE);
        
        // Our two animations, walking left and right.
        //player.animations.add('left', [0, 1, 2, 3], 10, true);
        this.player.animations.add('walk', Phaser.Animation.generateFrameNames('green_walk_', 1, 6), 10, true);   
        this.player.animations.add('run', Phaser.Animation.generateFrameNames('green_run_', 1, 6), 10, true);
        //player.animations.add('right', [5, 6, 7, 8], 10, true);
        
        this.player.anchor.setTo( .5, .5 );
        
    },
    
    update: function() {
        
        // when the player sprite overlaps the goal sprite the win function is called
        game.physics.arcade.overlap(this.player, this.goal, this.win, null, this);
        

        if (cursors.left.isDown)
        {
            //	Move to the left
            this.player.body.velocity.x = -100;
            this.player.scale.setTo(-1,1);
            this.player.animations.play('run');
        }
        else if (cursors.right.isDown)
        {
            //	Move to the right
            this.player.body.velocity.x = 50;
            this.player.scale.setTo(1,1);
            this.player.animations.play('walk');
        }
        else
        {
            //	Stand still
            this.player.animations.stop();
            //	Stop the player
            this.player.body.velocity.x = 0;

		//this.player.frame = 4;
	}

    },
    
    win: function() {
        game.state.start('win');
    }
};