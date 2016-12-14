class MapBuilder {
    constructor(level, configs) {
      this.level = level;
      this.configs = configs.map;
      this.init(configs);
    }

    init() {
      Citadel.game.physics.startSystem(Phaser.Physics.ARCADE);
      Citadel.keyboard = Citadel.game.input.keyboard;
      Citadel.mouse = Citadel.game.input;

      Citadel.I = Citadel.configs.PLAY_SCREEN_WIDTH / Citadel.configs.SQUARE.size;
      Citadel.J = Citadel.configs.PLAY_SCREEN_HEIGHT / Citadel.configs.SQUARE.size;

      Citadel.background = Citadel.game.add.sprite(0, 0,'assets', 'map/map1.png');
      Citadel.background.scale.setTo(Citadel.configs.PLAY_SCREEN_WIDTH / Citadel.background.width, Citadel.configs.PLAY_SCREEN_HEIGHT / Citadel.background.height);

      Citadel.bulletGroup = Citadel.game.add.physicsGroup();
      Citadel.enemyGroup = Citadel.game.add.physicsGroup();
      Citadel.squareGroup = Citadel.game.add.physicsGroup();
      Citadel.menuGruop = Citadel.game.add.group();

      Citadel.dragSprite = new DragSprite(Citadel.game, 0, 0, 'assets', 'tower/type1/idle/001.png');

      this.addGraphicMatrix();
      this.addTowerChoser();
      Citadel.play = true;
      Citadel.pause = false;
      Citadel.nextWaveWaiting = false;
      Citadel.lose = false;
    }

    reset(configs) {
      //TODO : clearmap
      Citadel.background.frameName = configs.background;
    }

    nextLevel() {
      this.changeMap(++this.level);
      this.nextWave();
    }

    mapConfigs() {
      return this.configs[this.level - 1];
    }

    changeMap(level) {
      this.level = (level > this.configs.length) ? level % this.configs.length : level;
      this.mapConfigs = this.configs[this.level - 1];
      this.reset(this.mapConfigs);
    }

    nextWave() {
      this.addEnemy();
    }

    addEnemy() {
      Citadel.enemyGroup.add(new Citadel.configs.enemy[0].class(Citadel.game, 100, 100, 'assets', Citadel.configs.enemy[0]));
      setTimeout(function() { Citadel.enemyGroup.add(new Citadel.configs.enemy[1].class(Citadel.game, 100, 100, 'assets', Citadel.configs.enemy[1]));}, 1000);
      setTimeout(function() { Citadel.enemyGroup.add(new Citadel.configs.enemy[2].class(Citadel.game, 100, 100, 'assets', Citadel.configs.enemy[2]));}, 2000);
      setTimeout(function() { Citadel.enemyGroup.add(new Citadel.configs.enemy[3].class(Citadel.game, 100, 100, 'assets', Citadel.configs.enemy[3]));}, 3000);
      setTimeout(function() { Citadel.enemyGroup.add(new Citadel.configs.enemy[4].class(Citadel.game, 100, 100, 'assets', Citadel.configs.enemy[4]));}, 4000);
    }

    addGraphicMatrix() {
      var style = { font: "12px Arial", fill: "#ff0044", wordWrap: true, wordWrapWidth: Citadel.configs.SQUARE.size, align: "center"};
      for(var j = 0; j < Citadel.J; j++) {
        for(var i = 0; i < Citadel.I; i++) {
          Citadel.squareGroup.add(new Square(Citadel.game, i, j, Citadel.configs.SQUARE));
          // var text = Citadel.game.add.text(i * Citadel.configs.SQUARE.size, j * Citadel.configs.SQUARE.size, i + "|" + j, style);
          if(!checkMapFree(i, j)) {
              // var text = Citadel.game.add.text(i * Citadel.configs.SQUARE.size, j * Citadel.configs.SQUARE.size, i + "|" + j, style);
              // var text = Citadel.game.add.text(i * Citadel.configs.SQUARE.size, j * Citadel.configs.SQUARE.size, (i * Citadel.configs.SQUARE.size) , style);
              // var text = Citadel.game.add.text(i * Citadel.configs.SQUARE.size, j * Citadel.configs.SQUARE.size, (j * Citadel.configs.SQUARE.size), style);
          }
        }
      }
    }

    addTowerChoser() {
      var top = Citadel.configs.menu.margin;
      for(var i = 0; i < 3; i++) {
        Citadel.menuGruop.add(new TowerChoser(Citadel.game, Citadel.configs.PLAY_SCREEN_WIDTH + Citadel.configs.SQUARE.size / 2 + Citadel.configs.menu.margin,
           top + Citadel.configs.menu.margin, 'assets', 'tower/type1/idle/001.png', Citadel.configs.towerChoser[i]));
          top += Citadel.configs.menu.margin + Citadel.menuGruop.children[Citadel.menuGruop.children.length - 1].height;
      }

      Citadel.mouse.onDown.add(gameClick, Citadel.game);
    }
}
