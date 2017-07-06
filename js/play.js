var playState = {

            
    create: function() {

        // DEBUG VARIABLE
        this.delay = 60;
        // Here we create the ground.
        this.ground = game.add.sprite(0, game.world.height - 64, 'ground2');
        game.physics.enable(this.ground, Phaser.Physics.ARCADE);

        // Scale it to fit the width of the game (the original sprite is 400x32 in size)
        this.ground.scale.setTo(2, 2);
        
        // This enable physics on the ground
        this.ground.enableBody = true;
        
        // This stops it from falling away when you jump on it
        this.ground.body.immovable = true;

        this.wall = game.add.sprite(-110, 64, 'ground2');
        game.physics.enable(this.wall, Phaser.Physics.ARCADE);
        this.wall.body.setSize(10, 400, 0, 0);
        
        // This enable physics on the ground
        this.wall.enableBody = true;
        
        // This stops it from falling away when you jump on it
        this.wall.body.immovable = true;
        
        // A Parallax background for our game each panel is a single tile the size of the game height & width and will wrap 
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
        this.bKey.onDown.add(this.flipDebug, this);        

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
 
        // load all of the current player animations
        this.loadAnimations(this.player, 'green');
        
        // set the axis to the center of the image
        this.player.anchor.setTo(.5,.5);
        this.createNerf();
        this.playerNerf.kill();
    },

    render: function() {
        if (game.debugFlag)
        {
            game.debug.bodyInfo(this.player, 32, 32);
            game.debug.body(this.player);
            game.debug.bodyInfo(this.playerNerf, 32, 232);
            game.debug.body(this.playerNerf);
        }
    },
    
    update: function() {
        
        // when the player sprite overlaps the goal sprite the win function is called
        game.physics.arcade.overlap(this.player, this.goal, this.win, null, this);

        // Collide the player and the tanks with the platforms
        game.physics.arcade.collide(this.player, this.ground, this.collisionCallback);
        game.physics.arcade.collide(this.player, this.wall);
        
        // Checks to see if the nerf darts collide with any of the players, if it does call the proper hit function
        game.physics.arcade.collide(this.player, this.playerNerf, this.playerHit, null, this);
        
        // move background by inverse 1/100 of velocity
        this.scrollBackground();

        if (!this.playerNerf.alive && !this.beam.alive && (Math.random() * 1000) > 995)
        {
            this.createNerf();
        };
        
        // check controls for jumping or moving left or right
        if (this.delay > 0 || !this.player.body.touching.down)
        {
            this.delay--;            
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
            this.player.animations.stop();
 
            // Stop the player
            this.player.body.velocity.x = 0;
        }

    },
    
    // flip debug enable
    flipDebug: function(){
        game.debugFlag = !game.debugFlag;
    },
    
    collisionCallback: function(spite1, sprite2){
        playState.beam.kill();
    },

    // function to scroll background based on character movement and layer depth
    scrollBackground: function() {
        this.back7.tilePosition.x -= .1/100 * this.player.body.velocity.x;
        this.back6.tilePosition.x -= .3/100 * this.player.body.velocity.x;
        this.back5.tilePosition.x -= .75/100 * this.player.body.velocity.x;
        this.back4.tilePosition.x -= 1/100 * this.player.body.velocity.x;
        this.back3.tilePosition.x -= 1.5/100 * this.player.body.velocity.x;
        this.back2.tilePosition.x -= 2.5/100 * this.player.body.velocity.x;
        this.back1.tilePosition.x -= 8/100 * this.player.body.velocity.x;    
    },

    // Our animations, all are runOnce (false).
    loadAnimations: function(sprite, fileName) {
        sprite.animations.add('fire', Phaser.Animation.generateFrameNames(fileName + '_fire_', 1, 8), 15, false); 
        sprite.animations.add('attack', Phaser.Animation.generateFrameNames(fileName + '_attack_', 1, 4), 12, false); 
        sprite.animations.add('jump', [fileName + '_jump_1', fileName + '_jump_2', fileName + '_jump_3', fileName + '_jump_3', fileName + '_jump_4', fileName + '_jump_4', fileName + '_jump_4', fileName + '_jump_3'], 5, false);           
        sprite.animations.add('run', Phaser.Animation.generateFrameNames(fileName + '_run_', 1, 6), 10, true);
        sprite.animations.add('dead', Phaser.Animation.generateFrameNames(fileName + '_dead_', 1, 5), 5, false);
        sprite.animations.add('idle', Phaser.Animation.generateFrameNames(fileName + '_idle_', 1, 3), 10, false);
    },
    
    createNerf: function() {
        this.playerNerf = game.add.sprite(790, 440, 'nerf');
        this.playerNerf.scale.setTo(-2,2);
        game.physics.enable(this.playerNerf, Phaser.Physics.ARCADE);
        this.playerNerf.body.setSize(45, 23, -90, 0);
        this.playerNerf.checkWorldBounds = true;
        this.playerNerf.outOfBoundsKill = true;
        this.playerNerf.body.velocity.x = -250;
    },

    playerHit: function(sprite, nerf){
        //	start a death sequence
        nerf.kill();
        playState.delay = 60;
        this.player.animations.play('dead');
        this.player.body.velocity.y = -200;
        this.beam = this.game.add.sprite(0, 0, 'beam');
    },
    
    win: function() {
        this.player.kill();
        game.state.start('play1');
    }
};