var Nakama = {};

Nakama.configs = {
  GAME_WIDTH: 1000,
  GAME_HEIGHT: 600
};

window.onload = function() {
  Nakama.game = new Phaser.Game(
    Nakama.configs.GAME_WIDTH,
    Nakama.configs.GAME_HEIGHT,
    Phaser.AUTO,
    '',
    {
      preload: preload,
      create: create,
      update: update,
      render: render
    },
    false,
    false
  );
}

var CLASS = {
  // laserWeapon: {};
};

var preload = function() {
    Nakama.game.scale.minWidth = 500;
    Nakama.game.scale.minHeight = 300;
    Nakama.game.scale.maxWidth = 1000;
    Nakama.game.scale.maxHeight = 600;
    Nakama.game.scale.pageAlignHorizontally = true;
    Nakama.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    Nakama.game.load.atlasJSONHash('assets', 'Assets/assets.png', 'Assets/assets.json');
    Nakama.game.load.image('background', 'Assets/Map1.png');
    Nakama.game.time.advancedTiming = true;
}

var create = function() {
  Nakama.game.physics.startSystem(Phaser.Physics.ARCADE);
  Nakama.keyboard = Nakama.game.input.keyboard;
  Nakama.background = Nakama.game.add.tileSprite(0, 0, Nakama.configs.GAME_WIDTH, Nakama.configs.GAME_HEIGHT, 'background');

  Nakama.bulletsGroup = Nakama.game.add.physicsGroup();

  enemy.health = 10;
}

var update = function() {

}

var render = function() {

}
