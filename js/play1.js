var play1State = {

            
    create: function() {
   
        // Our controls.
        cursors = game.input.keyboard.createCursorKeys();   
        this.wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
        this.aKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
        this.sKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
        this.dKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
        this.debugKey = game.input.keyboard.addKey(Phaser.Keyboard.B);
        this.sKey.onDown.add(function(){game.debugFlag = !game.debugFlag;});        
        
        // audio
        this.blaster = game.add.audio('blaster');
        this.jumpSound = game.add.audio('jumpsound');
        this.ohnoSound = game.add.audio('ohnosound');
        this.bass = game.add.audio('bass');         
        this.bass.loop = true;
         
        //timers
        this.fire = 30;
        this.kaneFire = 30;
        
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
        this.portal = game.add.sprite(-100,320 , 'goal');
            
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
       
        // load all of the current player animations
        playState.loadAnimations(this.player, 'green');
        playState.loadAnimations(this.kane, 'kane');
                      
        // set the body boxes for both characters identical and bound the general sprite (width, height, offset.x, offset.y)
        this.player.body.setSize(119*2, 197.5*2, 0, 17);
        this.kane.body.setSize(119*2, 197.5*2, -126, 0);
        
        // set the axis to the size of both players to half
        this.player.scale.setTo(.5,.5);
        this.kane.scale.setTo(-.5,.5);
        
        this.player.events.onAnimationComplete.add(this.playerStopped, this);
        this.kane.events.onAnimationComplete.add(this.playerStopped, this);

        // create the nerf darts
        this.playerNerf = game.add.sprite(280, 425, 'nerf');
        this.nerfInit(this.playerNerf);

        this.kaneNerf = game.add.sprite(480, 425, 'nerf');
        this.nerfInit(this.kaneNerf);
        
        this.bass.play();   
        this.bass.onLoop.add(this.playMusic, this);

        // our touch controls and help tips
        this.left = false;
        this.right = false;
        this.jump = false;
        this.wLabel = game.add.text(50, 470, 'W', { font: '60px Comic Sans MS', fill: '#ffffff' });
        this.aLabel = game.add.text(25, 520, 'A', { font: '60px Comic Sans MS', fill: '#ffffff' });
        this.dLabel = game.add.text(95, 520, 'D', { font: '60px Comic Sans MS', fill: '#ffffff' });
        
        // Enable events on the two labels
        this.wLabel.inputEnabled = true;
        this.aLabel.inputEnabled = true;
        this.dLabel.inputEnabled = true;

        this.wLabel.events.onInputOver.add(function(){play1State.jump=true;});
        this.wLabel.events.onInputOut.add(function(){play1State.jump=false;});
        this.wLabel.events.onInputDown.add(function(){play1State.jump=true;});
        this.wLabel.events.onInputUp.add(function(){play1State.jump=false;});
        
        this.aLabel.events.onInputOver.add(function(){play1State.left=true;});
        this.aLabel.events.onInputOut.add(function(){play1State.left=false;});
        this.aLabel.events.onInputDown.add(function(){play1State.left=true;});
        this.aLabel.events.onInputUp.add(function(){play1State.left=false;});
        
        this.dLabel.events.onInputOver.add(function(){play1State.right=true;});
        this.dLabel.events.onInputOut.add(function(){play1State.right=false;});
        this.dLabel.events.onInputDown.add(function(){play1State.right=true;});
        this.dLabel.events.onInputUp.add(function(){play1State.right=false;});

        // Kane's touch controls and help tips
        this.kaneLeft = false;
        this.kaneRight = false;
        this.kaneJump = false;
        this.upLabel = game.add.text(700, 470, '^', { font: '60px Comic Sans MS', fill: '#ffffff' });
        this.leftLabel = game.add.text(675, 520, '<', { font: '60px Comic Sans MS', fill: '#ffffff' });
        this.rightLabel = game.add.text(745, 520, '>', { font: '60px Comic Sans MS', fill: '#ffffff' });
        
        // Enable events on the two labels
        this.upLabel.inputEnabled = true;
        this.leftLabel.inputEnabled = true;
        this.rightLabel.inputEnabled = true;

        this.upLabel.events.onInputOver.add(function(){play1State.kaneJump=true;});
        this.upLabel.events.onInputOut.add(function(){play1State.kaneJump=false;});
        this.upLabel.events.onInputDown.add(function(){play1State.kaneJump=true;});
        this.upLabel.events.onInputUp.add(function(){play1State.kaneJump=false;});
        
        this.leftLabel.events.onInputOver.add(function(){play1State.kaneLeft=true;});
        this.leftLabel.events.onInputOut.add(function(){play1State.kaneLeft=false;});
        this.leftLabel.events.onInputDown.add(function(){play1State.kaneLeft=true;});
        this.leftLabel.events.onInputUp.add(function(){play1State.kaneLeft=false;});
        
        this.rightLabel.events.onInputOver.add(function(){play1State.kaneRight=true;});
        this.rightLabel.events.onInputOut.add(function(){play1State.kaneRight=false;});
        this.rightLabel.events.onInputDown.add(function(){play1State.kaneRight=true;});
        this.rightLabel.events.onInputUp.add(function(){play1State.kaneRight=false;});
        
},
    
    render: function() {
         if (game.debugFlag)
        {
            game.debug.bodyInfo(this.player, 32, 6);
            game.debug.bodyInfo(this.kane, 32, 102);
            game.debug.bodyInfo(this.playerNerf, 32, 198);
            game.debug.bodyInfo(this.kaneNerf, 32, 294);
            game.debug.body(this.player);
            game.debug.body(this.kane);
            game.debug.body(this.playerNerf);
            game.debug.body(this.kaneNerf);
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
        else if ((this.left || this.aKey.isDown) && !this.playerNerf.alive) 
        {
            // start a attack
            this.fire = 40;
            this.player.animations.play('attack');
        }
        else if ((this.dKey.isDown || this.right) && !this.playerNerf.alive)
        {
            // start a fire
            this.fire = 60;
            this.player.animations.play('fire');
        }
        else if (this.wKey.isDown || this.jump) 
        {
            // start a jump
            this.player.body.velocity.y = -200;
            this.player.animations.play('jump');
            this.jumpSound.play();
        }
        else
        {
            // return players to idle    
            this.player.animations.play('idle');
            this.player.animations.stop();
            this.portal.kill();   
            // Stop the players
            this.player.body.velocity.x = 0;
        }
        
        // check controls for kane
        if (this.kaneFire > 0 || !this.kane.body.touching.down)
        {
            this.kaneFire--;           
        }
        else if ((this.kaneLeft || cursors.left.isDown) && !this.kaneNerf.alive)
        {
            // start a fire
            this.kaneFire = 60;
            this.kane.animations.play('fire');
        }
        else if ((this.kaneRight || cursors.right.isDown) && !this.kaneNerf.alive)
        {
            // start a fire
            this.kaneFire = 40;
            this.kane.animations.play('attack');
        }
        else if (this.kaneJump || cursors.up.isDown) 
        {
            // start a jump
            this.kane.body.velocity.y = -200;
            this.kane.animations.play('jump');
            this.jumpSound.play();
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

    // case statement based on which character (sprite.key) and what animation was completed (animation.name)
    switch(sprite.key + animation.name) {
        case 'playerfire':
        
            this.fire = 0;
            this.playerFire(sprite, this.playerNerf)
            this.blaster.play();
            break;
        
        case 'kanefire':
        
            this.kaneFire = 0;
            this.playerFire(sprite, this.kaneNerf)
            this.blaster.play();
            break;
        
        case 'playerdead':
        // fallthrough for or case
        case 'kanedead':
            game.state.start('win')
            break;
        }
    },
         
    nerfInit: function(nerf) {
         // create the nerf darts
        game.physics.enable(nerf, Phaser.Physics.ARCADE);
        nerf.body.setSize(45, 23, 0, 0);
        nerf.checkWorldBounds = true;
        nerf.outOfBoundsKill = true;
        nerf.kill();
    },

    playerFire: function(sprite, nerf){
            // draw the nerfDart and box based on sprite orientation, position
            nerf.reset(sprite.body.position.x + Math.sign(sprite.scale.x) * (105 + Math.sign(sprite.scale.x) * 60), sprite.body.position.y + 92);
            nerf.scale.setTo(Math.sign(sprite.scale.x),1);
            nerf.body.velocity.x = Math.sign(sprite.scale.x) * 250;
            nerf.body.setSize(45, 23, - 22 + Math.sign(sprite.scale.x) * 22, 0);
    },

    playMusic: function() {
        // cleanup audio incase loop and stop occur too close together
        this.bass.stop();
        this.bass.play();
    },
     
    playerHit: function(sprite, nerf){
        //	start a death sequence
        this.bass.stop();
        this.ohnoSound.play();
        nerf.kill();
        this.fire = 90;
        this.kaneFire = 90;
        sprite.body.setSize(200,200, 0, 0);
        sprite.animations.play('dead');
    }
};