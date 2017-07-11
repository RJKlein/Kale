var loadState= {
    
    preload: function() {
        
        // add a loading label on screen
        var loadLabel = game.add.text(80, 150, 'loading...',{font: '30px Courier', fill: '#ffffff'});
        
        // fullscreen setup
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;

        // load assets    
        game.load.audio('theme', 'assets/theme.wav');
        game.load.audio('blink', 'assets/spaceman.wav');
        game.load.audio('beamsound', 'assets/beam-sound.mp3');
        game.load.audio('gameoversound', 'assets/gameover-sound.mp3');
        game.load.audio('jumpsound', 'assets/jump-sound.wav');
        game.load.audio('ohnosound', 'assets/oh-no.wav');
        game.load.audio('ouchsound', 'assets/ouch.wav');
        game.load.audio('blaster', 'assets/blaster.mp3');
        game.load.audio('bass', 'assets/bass.mp3');
        game.load.audio('drums', 'assets/drums.mp3');
        game.load.audio('synth1', 'assets/synth1.mp3');
        
        game.load.image('goal', 'assets/goal.png');
        game.load.image('beam', 'assets/beam.png');
        game.load.image('nerf', 'assets/nerf.png');
        game.load.image('back1', 'assets/layer_01_1920 x 1080.png');
        game.load.image('back2', 'assets/layer_02_1920 x 1080.png');
        game.load.image('back3', 'assets/layer_03_1920 x 1080.png');
        game.load.image('back4', 'assets/layer_04_1920 x 1080.png');
        game.load.image('back5', 'assets/layer_05_1920 x 1080.png');
        game.load.image('back6', 'assets/layer_06_1920 x 1080.png');
        game.load.image('back7', 'assets/layer_07_1920 x 1080.png');
        game.load.image('sky', 'assets/horsehead.jpg');
        game.load.image('planet', 'assets/planet.png');
        game.load.image('ground2', 'assets/mars.png');
        game.load.image('gameover', 'assets/gameover.jpg');
        
        game.load.atlas('player','assets/spritesheet.png', 'assets/sprites.json');
        game.load.atlas('kane','assets/kanesheet.png', 'assets/kane.json');
        
    },
    
    create: function() {
        // Call menu state
        game.state.start('menu');
    }
};