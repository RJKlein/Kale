var loadState= {
    
    preload: function() {
        
        // add a loading label on screen
        var loadLabel = game.add.text(80, 150, 'loading...',{font: '30px Courier', fill: '#ffffff'});


        // load assets
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
        game.load.image('sky', 'assets/IMG_0027.jpg');
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