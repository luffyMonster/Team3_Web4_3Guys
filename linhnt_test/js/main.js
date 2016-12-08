var Nakama = {};

Nakama.configs = {
  GAME_WIDTH: 640,
  GAME_HEIGHT: 940,
  SHIP1: {
    shipSpeed: 200,
    bulletSpeed: 1000,
    info: {
      x: 200,
      y: 800,
      img: "Spaceship1-Player.png"
    },
    control: {
      up: Phaser.Keyboard.UP,
      down: Phaser.Keyboard.DOWN,
      left: Phaser.Keyboard.LEFT,
      right: Phaser.Keyboard.RIGHT,
      fire: Phaser.Keyboard.ENTER
    },
    cooldown: 0.1,
    frameName: {
      front: "Spaceship1-Player.png",
      left: "Spaceship1Left-Player.png",
      right: "Spaceship1Right-Player.png"
    },
    weapon1: {
      position: {
        x: 40,
        y: 0
      },
      frame: 'BulletType1.png',
      maxNumber: 40,
      bulletAngleOffset: 90,
      bulletAngleVariance: 1,
      fireAngle: -80,
      bulletSpeed: 600,
      fireRate: 100
    },
    weapon2: {
      position: {
        x: 40,
        y: 0
      },
      frame: 'BulletType1.png',
      maxNumber: 40,
      bulletAngleOffset: 90,
      bulletAngleVariance: 1,
      fireAngle: -100,
      bulletSpeed: 600,
      fireRate: 100
    }
  },

  SHIP2: {
    shipSpeed: 300,
    bulletSpeed: 1000,
    info: {
      x: 500,
      y: 800,
      img: "Spaceship2-Player.png"
    },
    frameName: {
      front: "Spaceship2-Player.png",
      left: "Spaceship2Left-Player.png",
      right: "Spaceship2Right-Player.png"
    },
    control: {
      up: Phaser.Keyboard.W,
      down: Phaser.Keyboard.S,
      left: Phaser.Keyboard.A,
      right: Phaser.Keyboard.D,
      fire: Phaser.Keyboard.SPACEBAR
    },
    cooldown: 0.1,
    weapon1: {
      position: {
        x: 40,
        y: -450
      },
      frame: 'BulletType3.png',
      maxNumber: 100,
      bulletAngleOffset: 90,
      bulletAngleVariance: 0,
      fireAngle: -90,
      bulletSpeed: 0,
      fireRate: 50
    },
    weapon2: {
      position: {
        x: 40,
        y: 0
      },
      frame: 'BulletType2.png',
      maxNumber: 20,
      bulletAngleOffset: 90,
      bulletAngleVariance: 10,
      fireAngle: -90,
      bulletSpeed: 400,
      fireRate: 50
    }
  },

  ENEMY_TYPE1: {
    
  }
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

var func = {
  createWeapon: function (configs, owner) {
    var weapon = Nakama.game.add.weapon(configs.maxNumber, 'assets', configs.frame);
    weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    weapon.fireAngle = configs.fireAngle;
    weapon.bulletAngleOffset = configs.bulletAngleOffset;
    weapon.bulletAngleVariance = configs.bulletAngleVariance;
    weapon.setBulletFrames(0, 1, false);
    weapon.bulletSpeed = configs.bulletSpeed;
    weapon.fireRate = configs.fireRate;
    weapon.trackSprite(owner, configs.position.x, configs.position.y);
    return weapon;
  },

  ship1Fire: function() {
    if(Nakama.ship1.weapon1) {
      Nakama.ship1.weapon1.fire();
    }

    if(Nakama.ship1.weapon2) {
      Nakama.ship1.weapon2.fire();
    }
  },

  ship2Fire: function() {
    if(Nakama.ship2.weapon1) {
      Nakama.ship2.weapon1.fire();
    }

    if(Nakama.ship2.weapon2) {
      Nakama.ship2.weapon2.fire();
    }
  }
};

var preload = function() {
    Nakama.game.scale.minWidth = 320;
    Nakama.game.scale.minHeight = 480;
    Nakama.game.scale.maxWidth = 640;
    Nakama.game.scale.maxHeight = 960;
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
  Nakama.enemiesGroup = Nakama.game.add.physicsGroup();
  Nakama.shipControllersGroup = Nakama.game.add.physicsGroup();
  Nakama.shipControllers = [];

  Nakama.shipControllers.push(new ShipController(Nakama.configs.SHIP1.info, Nakama.configs.SHIP1));
  Nakama.shipControllers.push(new ShipController(Nakama.configs.SHIP2.info, Nakama.configs.SHIP2));

  var enemy = Nakama.enemiesGroup.create(
    300, 100, 'assets', 'EnemyType1.png'
  );
  enemy.health = 10;

  // Nakama.shipControllers.forEach(function(ele) {console.log(ele)});

  // Nakama.ship1.configs = Nakama.configs.SHIP1;
  // Nakama.game.physics.enable(Nakama.ship1, Phaser.Physics.ARCADE);
  //
  // Nakama.ship1.weapon1 = func.createWeapon(Nakama.configs.SHIP1.weapon1, Nakama.ship1);
  // Nakama.ship1.weapon2 = func.createWeapon(Nakama.configs.SHIP1.weapon2, Nakama.ship1);
  //
  // Nakama.ship2 = Nakama.game.add.sprite(
  //   Nakama.configs.SHIP2.START_POSITION.x,
  //   Nakama.configs.SHIP2.START_POSITION.y,
  //   'assets',
  //   'Spaceship2-Player.png'
  // );
  // Nakama.ship2.configs = Nakama.configs.SHIP2;
  // Nakama.game.physics.enable(Nakama.ship2, Phaser.Physics.ARCADE);
  //
  // Nakama.ship2.weapon1 = func.createWeapon(Nakama.configs.SHIP2.weapon1, Nakama.ship2);
  // Nakama.ship2.weapon2 = func.createWeapon(Nakama.configs.SHIP2.weapon2, Nakama.ship2);
}

var update = function() {
  //--------------background---------------
  Nakama.background.tilePosition.y += 10;

  Nakama.shipControllers.forEach(function(sc, i) {
    sc.update();
  });
  //--------------ship1---------------
  Nakama.game.physics.arcade.overlap(Nakama.bulletsGroup, Nakama.enemiesGroup, onBulletHitActor);
  // Nakama.ship1.x = (Nakama.ship1.x < 0 ? 0 : Nakama.ship1.x > Nakama.configs.GAME_WIDTH - 80 ? Nakama.configs.GAME_WIDTH - 80 : Nakama.ship1.x);
  // Nakama.ship1.y = (Nakama.ship1.y < 0 ? 0 : Nakama.ship1.y > Nakama.configs.GAME_HEIGHT - 50 ? Nakama.configs.GAME_HEIGHT - 50 : Nakama.ship1.y);
  // if(Nakama.keyboard.isDown(Phaser.Keyboard.ENTER)) {
  //   func.ship1Fire();
  // }
  //--------------ship2---------------

  // Nakama.ship2.x = (Nakama.ship2.x < 0 ? 0 : Nakama.ship2.x > Nakama.configs.GAME_WIDTH - 80 ? Nakama.configs.GAME_WIDTH - 80 : Nakama.ship2.x);
  // Nakama.ship2.y = (Nakama.ship2.y < 0 ? 0 : Nakama.ship2.y > Nakama.configs.GAME_HEIGHT - 50 ? Nakama.configs.GAME_HEIGHT - 50 : Nakama.ship2.y);
  // if(Nakama.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
  //   func.ship2Fire();
  // }
}

function onBulletHitActor(bullet, actor) {
  actor.damage(1);
  bullet.kill();
}

var render = function() {
  // Nakama.ship1.weapon1.debug();
}
