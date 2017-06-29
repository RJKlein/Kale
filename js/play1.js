var play1State = {

            
    create: function() {
        


        // Our controls.
        cursors = game.input.keyboard.createCursorKeys();
        this.fire = 0;
        this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.bKey = game.input.keyboard.addKey(Phaser.Keyboard.B);

        // Here we'll create a basic looped event.
        // A looped event is like a repeat event but with no limit, it will literally repeat itself forever, or until you stop it.
        // The first parameter is how long to wait before the event fires. In this case 1 second (you could pass in 1000 as the value as well.)
        // The next two parameters are the function to call ('decrementScore') and the context under which that will happen.
        
        //game.time.events.loop(Phaser.Timer.SECOND, decrementScore, this);
        
        // Here we create the ground.
        this.ground = game.add.sprite(0, game.world.height - 64, 'ground2');
        game.physics.enable(this.ground, Phaser.Physics.ARCADE);
        
        // Scale it to fit the width of the game (the original sprite is 400x32 in size)
        this.ground.scale.setTo(2, 2);
        
        // This enable physics on the ground
        this.ground.enableBody = true;
        
        // This stops it from falling away when you jump on it
        this.ground.body.immovable = true;

        // A simple background for our game on top of our platform
        game.add.sprite(0, 0, 'planet');
        
        // create the player sprite and enable physics
        this.player = game.add.sprite(80, 316, 'player');
        game.physics.enable(this.player, Phaser.Physics.ARCADE);
        // Player physics properties. Give KALE a slight bounce.
        this.player.body.bounce.y = 0.2;
        this.player.body.gravity.y = 125;
       
        // create the enemy sprite and enable physics
        this.kane = game.add.sprite(680, 340, 'kane');
        game.physics.enable(this.kane, Phaser.Physics.ARCADE);
        // kane's physics properties. Give KANE a slight bounce.
        this.kane.body.bounce.y = 0.2;
        this.kane.body.gravity.y = 125;
       
        // create the goal sprite and enable physics
        this.goal = game.add.sprite(820, 256, 'goal');
        game.physics.enable(this.goal, Phaser.Physics.ARCADE);
        
        // Our animations, run(true = looped), jump and idle are runOnce (false).
        this.player.animations.add('fire', Phaser.Animation.generateFrameNames('green_fire_', 1, 11), 12, false); 
        this.player.animations.add('attack', Phaser.Animation.generateFrameNames('green_attack_', 1, 4), 12, false); 
        this.player.animations.add('jump', ['green_jump_1', 'green_jump_2', 'green_jump_3', 'green_jump_4', 'green_jump_4', 'green_jump_3'], 5, false);           
        this.player.animations.add('run', Phaser.Animation.generateFrameNames('green_run_', 1, 6), 10, true);
        this.player.animations.add('idle', Phaser.Animation.generateFrameNames('green_idle_', 1, 3), 10, false);
        
        // Kane's animations
        this.kane.animations.add('jump2', Phaser.Animation.generateFrameNames('kane_jump_', 1, 4), 5, false); 
        this.kane.animations.add('jump', ['kane_jump_1', 'kane_jump_2', 'kane_jump_3', 'kane_jump_4', 'kane_jump_4', 'kane_jump_3'], 5, false);           
        this.kane.animations.add('run', Phaser.Animation.generateFrameNames('kane_run_', 1, 6), 10, true);
        this.kane.animations.add('idle', Phaser.Animation.generateFrameNames('kane_idle_', 1, 3), 10, false);
                
        // set the axis to the center of the image
        this.player.scale.setTo(.5,.5);
        this.kane.scale.setTo(-.5,.5);

    },
    
    update: function() {
        
        // when the player sprite overlaps the goal sprite the win function is called
        game.physics.arcade.overlap(this.player, this.goal, this.win, null, this);

        // Collide the player, kane with the platforms
        game.physics.arcade.collide(this.player, this.ground);
        game.physics.arcade.collide(this.kane, this.ground);
        

        // check controls for fireing or moving left or right
        if (this.fire>0)
        {
            this.fire--;           
        }
        else if (this.spaceKey.isDown) 
        {
            //	start a fire
            this.fire = 60;
            this.player.animations.play('attack');
        }
        else if (cursors.left.isDown)
        {
            //	Move to the left
            this.player.scale.setTo(-.5,.5);
            this.player.body.velocity.x = -100;
            this.player.animations.play('run');
        }
        else if (cursors.right.isDown)
        {
            //	Move to the right
            this.player.scale.setTo(.5,.5);
            this.player.body.velocity.x = 100;
            this.player.animations.play('run');
        }
        else
        {
            this.player.animations.play('idle');
            this.kane.animations.play('idle');
            this.kane.animations.stop();
            
            if (!this.bKey.isDown)
            {
                // Stand still
                this.player.animations.stop();
            }
            // Stop the player
            this.player.body.velocity.x = 0;
        }

    },
    
    win: function() {
        game.state.start('win');
    }
};