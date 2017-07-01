var playState = {

            
    create: function() {

        // Here we create the ground.
        this.ground = game.add.sprite(0, game.world.height - 64, 'ground2');
        game.physics.enable(this.ground, Phaser.Physics.ARCADE);
        
        // A Parallax background for our game
        this.back7 = this.game.add.tileSprite(0, this.game.height - this.game.cache.getImage('back7').height, this.game.width, this.game.cache.getImage('back7').height,'back7');
        this.back6 = this.game.add.tileSprite(0, this.game.height - this.game.cache.getImage('back6').height, this.game.width, this.game.cache.getImage('back6').height,'back6');
        this.back5 = this.game.add.tileSprite(0, this.game.height - this.game.cache.getImage('back5').height, this.game.width, this.game.cache.getImage('back5').height,'back5');
        this.back4 = this.game.add.tileSprite(0, this.game.height - this.game.cache.getImage('back4').height, this.game.width, this.game.cache.getImage('back4').height,'back4');
        this.back3 = this.game.add.tileSprite(0, this.game.height - this.game.cache.getImage('back3').height, this.game.width, this.game.cache.getImage('back3').height,'back3');
        this.back2 = this.game.add.tileSprite(0, this.game.height - this.game.cache.getImage('back2').height, this.game.width, this.game.cache.getImage('back2').height,'back2');
        this.beam = this.game.add.sprite(0, 0, 'beam');
                
        // Our controls.
        cursors = game.input.keyboard.createCursorKeys();
        this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.bKey = game.input.keyboard.addKey(Phaser.Keyboard.B);

        // Here we'll create a basic looped event.
        // A looped event is like a repeat event but with no limit, it will literally repeat itself forever, or until you stop it.
        // The first parameter is how long to wait before the event fires. In this case 1 second (you could pass in 1000 as the value as well.)
        // The next two parameters are the function to call ('decrementScore') and the context under which that will happen.
        
        //game.time.events.loop(Phaser.Timer.SECOND, decrementScore, this);
        

        
        // Scale it to fit the width of the game (the original sprite is 400x32 in size)
        this.ground.scale.setTo(2, 2);
        
        // This enable physics on the ground
        this.ground.enableBody = true;
        
        // This stops it from falling away when you jump on it
        this.ground.body.immovable = true;
       
        // create the player sprite and enable physics
        this.player = game.add.sprite(16, -220, 'player');
        game.physics.enable(this.player, Phaser.Physics.ARCADE);
        // Player physics properties. Give KALE a slight bounce.
        this.player.body.bounce.y = 0.2;
        this.player.body.gravity.y = 125;

        // create foreground last
        this.back1 = this.game.add.tileSprite(0, this.game.height - this.game.cache.getImage('back1').height, this.game.width, this.game.cache.getImage('back1').height,'back1');
        
        // create the goal sprite and enable physics
        this.goal = game.add.sprite(820, 256, 'goal');
        game.physics.enable(this.goal, Phaser.Physics.ARCADE);
        
        // Our animations, run(true = looped), jump and idle are runOnce (false).
        this.player.animations.add('jump', ['green_jump_1', 'green_jump_2', 'green_jump_3', 'green_jump_3', 'green_jump_4', 'green_jump_4', 'green_jump_4', 'green_jump_3'], 5, false);           
        this.player.animations.add('run', Phaser.Animation.generateFrameNames('green_run_', 1, 6), 10, true);
        this.player.animations.add('idle', Phaser.Animation.generateFrameNames('green_idle_', 1, 3), 10, false);
        
        // set the axis to the center of the image
        this.player.anchor.setTo(.5,.5);
        
    },

    render: function() {
        game.debug.bodyInfo(this.player, 32, 32);
        game.debug.body(this.player);
    },
    
    update: function() {
        
        // when the player sprite overlaps the goal sprite the win function is called
        game.physics.arcade.overlap(this.player, this.goal, this.win, null, this);

        // Collide the player and the tanks with the platforms
        game.physics.arcade.collide(this.player, this.ground);
        
        // move background by inverse 1/100 of velocity
        this.scrollBackground();

        // check controls for jumping or moving left or right
        if (!this.player.body.touching.down)
        {
            // delay for flight time           
        }
        else if (this.spaceKey.isDown) 
        {
            //	start a jump
            this.player.body.velocity.y = -200;
            this.player.animations.play('jump');
        }
        else if (cursors.left.isDown)
        {
            //	Move to the left
            this.player.scale.setTo(-1,1);
            this.player.body.velocity.x = -100;
            this.player.animations.play('run');
        }
        else if (cursors.right.isDown)
        {
            //	Move to the right
            this.player.scale.setTo(1,1);
            this.player.body.velocity.x = 100;
            this.player.animations.play('run');
        }
        else
        {
            this.player.animations.play('idle');
            this.beam.kill();
            if (!this.bKey.isDown)
            {
                // Stand still
                this.player.animations.stop();
            }
            // Stop the player
            this.player.body.velocity.x = 0;
        }

    },
    
        // function to give life to menu screen
    scrollBackground: function() {
            this.back7.tilePosition.x -= .1/100 * this.player.body.velocity.x;
            this.back6.tilePosition.x -= .3/100 * this.player.body.velocity.x;
            this.back5.tilePosition.x -= .75/100 * this.player.body.velocity.x;
            this.back4.tilePosition.x -= 1/100 * this.player.body.velocity.x;
            this.back3.tilePosition.x -= 1.5/100 * this.player.body.velocity.x;
            this.back2.tilePosition.x -= 2.5/100 * this.player.body.velocity.x;
            this.back1.tilePosition.x -= 8/100 * this.player.body.velocity.x;    
    },
    
    win: function() {
        this.player.kill();
        game.state.start('play1');
    }
};