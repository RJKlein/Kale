var play1State = {

            
    create: function() {
   
        // DEBUG VARIABLE
        this.debugFlag = false;

        // Our controls.
        cursors = game.input.keyboard.createCursorKeys();
        this.fire = 30;
        this.kaneFire = 0;
        this.wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
        this.aKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
        this.sKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
        this.dKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
        this.bKey = game.input.keyboard.addKey(Phaser.Keyboard.B);
        this.bKey.onDown.add(this.flipDebug, this);
        
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
        this.player = game.add.sprite(80, 300, 'player');
        game.physics.enable(this.player, Phaser.Physics.ARCADE);

        // Player physics properties. Give KALE a slight bounce.
        this.player.body.bounce.y = 0.2;
        this.player.body.gravity.y = 125;
        this.player.body.velocity.x = 50;
                
        // create the enemy sprite and enable physics
        this.kane = game.add.sprite(680, 340, 'kane');
        game.physics.enable(this.kane, Phaser.Physics.ARCADE);

        // kane's physics properties. Give KANE a slight bounce.
        this.kane.body.bounce.y = 0.2;
        this.kane.body.gravity.y = 125;
       
        
        // Our animations, all are runOnce (false).
        this.player.animations.add('fire', Phaser.Animation.generateFrameNames('green_fire_', 1, 8), 15, false); 
        this.player.animations.add('attack', Phaser.Animation.generateFrameNames('green_attack_', 1, 4), 12, false); 
        this.player.animations.add('jump', ['green_jump_1', 'green_jump_2', 'green_jump_3', 'green_jump_3', 'green_jump_4', 'green_jump_4', 'green_jump_4', 'green_jump_3'], 5, false);           
        this.player.animations.add('dead', Phaser.Animation.generateFrameNames('green_dead_', 1, 5), 5, false);
        this.player.animations.add('idle', Phaser.Animation.generateFrameNames('green_idle_', 1, 3), 10, false);
        
        // Kane's animations, all are runOnce (false).
        this.kane.animations.add('fire', Phaser.Animation.generateFrameNames('kane_fire_', 1, 8), 12, false); 
        this.kane.animations.add('attack', Phaser.Animation.generateFrameNames('kane_attack_', 1, 4), 12, false); 
        this.kane.animations.add('jump', ['kane_jump_1', 'kane_jump_2', 'kane_jump_3', 'kane_jump_3', 'kane_jump_4', 'kane_jump_4', 'kane_jump_4', 'kane_jump_3'], 5, false);           
        this.kane.animations.add('dead', Phaser.Animation.generateFrameNames('kane_dead_', 1, 5), 5, false);
        this.kane.animations.add('idle', Phaser.Animation.generateFrameNames('kane_idle_', 1, 3), 10, false);
                
        // set the axis to the size of both players to half
        this.kane.body.setSize(119*2, 197.5*2, -119, 0);
        this.player.scale.setTo(.5,.5);
        this.kane.scale.setTo(-.5,.5);
        
        this.player.events.onAnimationComplete.add(this.playerStopped, this);
        this.kane.events.onAnimationComplete.add(this.playerStopped, this);

      
    },
    
    render: function() {
         if (this.debugFlag)
        {
            game.debug.bodyInfo(this.player, 32, 32);
            game.debug.bodyInfo(this.kane, 32, 232);
            game.debug.body(this.player);
            game.debug.body(this.kane);
        }
    },
    
    update: function() {

        // Collide the player, kane with the platforms
        game.physics.arcade.collide(this.player, this.ground);
        game.physics.arcade.collide(this.kane, this.ground);

        // Checks to see if the nerf darts collide with any of the players, if it does call the proper hit function
        game.physics.arcade.collide(this.kane, this.playerNerf, this.playerHit, null, this);
        game.physics.arcade.collide(this.player, this.kaneNerf, this.playerHit, null, this);        
        
        // check controls for player
        if (this.fire > 0 || !this.player.body.touching.down)
        {
            this.fire--;           
        }
        else if (this.aKey.isDown) 
        {
            //	start a fire
            this.fire = 60;
            this.player.animations.play('attack');
        }
        else if (this.dKey.isDown)
        {
            //	start a fire
            this.fire = 60;
            this.player.animations.play('fire');
        }
        else if (this.wKey.isDown) 
        {
            //	start a jump
            this.player.body.velocity.y = -200;
            this.player.animations.play('jump');
        }
        else
        {
            // return players to idle    
            this.player.animations.play('idle');
            this.player.animations.stop();
 
            // Stop the players
            this.player.body.velocity.x = 0;
        }
        
        // check controls for kane
        if (this.kaneFire > 0 || !this.kane.body.touching.down)
        {
            this.kaneFire--;           
        }
        else if (cursors.left.isDown)
        {
            //	start a fire
            this.kaneFire = 60;
            this.kane.animations.play('fire');
        }
        else if (cursors.right.isDown)
        {
            //	start a fire
            this.kaneFire = 60;
            this.kane.animations.play('attack');
        }
        else if (cursors.up.isDown) 
        {
            //	start a jump
            this.kane.body.velocity.y = -200;
            this.kane.animations.play('jump');
        }
        else
        {
            // return players to idle    
            this.kane.animations.play('idle');
            this.kane.animations.stop();
  
            // Stop the players
            this.kane.body.velocity.x = 0;
        }

    },

    playerStopped: function(sprite, animation) {
    game.add.text(sprite.x / 2 , 100, sprite.key + ' ' + animation.name + ' stopped', { fill: 'white' });
    // case statement based on which character (sprite.key) and what animation was completed (animation.name)
    switch(sprite.key + animation.name) {
        case 'playerfire':
        
            this.fire = 0;
        
            this.playerNerf = game.add.sprite(280, 425, 'nerf');
            game.physics.enable(this.playerNerf, Phaser.Physics.ARCADE);
            this.playerNerf.checkWorldBounds = true;
            this.playerNerf.outOfBoundsKill = true;
            this.playerNerf.scale.setTo(1,1);
            this.playerNerf.body.velocity.x = 250;
            break;
        
        case 'kanefire':
        
            this.kaneFire = 0;
        
            this.kaneNerf = game.add.sprite(480, 430, 'nerf');
            game.physics.enable(this.kaneNerf, Phaser.Physics.ARCADE);
            this.kaneNerf.checkWorldBounds = true;
            this.kaneNerf.outOfBoundsKill = true;
            this.kaneNerf.scale.setTo(-1,1);
            this.kaneNerf.body.velocity.x = -250;
            break;
        
        case 'playerdead':
        // fallthrough for or case
        case 'kanedead':
            game.state.start('win')
            break;
        }
    },

        
    flipDebug: function(){
        // check for debug enable
        this.debugFlag = !this.debugFlag;
    },
    
    playerHit: function(sprite, nerf){
        //	start a death sequence
        nerf.kill();
        this.fire = 90;
        this.kaneFire = 90;
        sprite.body.setSize(200,200, 0, 0);
        sprite.animations.play('dead');
    }
};