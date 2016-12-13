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
      Citadel.squareGroup = Citadel.game.add.physicsGroup();
      Citadel.menuGruop = Citadel.game.add.group();

      Citadel.dragSprite = new DragSprite(Citadel.game, 0, 0, 'assets', 'tower/type1/idle/001.png');

      this.addGraphicMatrix();
      this.addTowerChoser();

      this.changeMap(this.level);
    }

    nextLevel() {
      this.changeMap(++this.level);
    }

    changeMap(level) {
      this.level = level > this.configs.length ? level % this.configs.length : level;
      var configs = this.configs[this.level - 1];
      this.reset(configs);
    }

    reset(configs) {
      Citadel.background.frameName = configs.background;
    }

    addGraphicMatrix() {
      // var style = { font: "12px Arial", fill: "#ff0044", wordWrap: true, wordWrapWidth: Citadel.configs.SQUARE.size, align: "center"};
      for(var j = 0; j < Citadel.J; j++) {
        for(var i = 0; i < Citadel.I; i++) {
          Citadel.squareGroup.add(new Square(Citadel.game, i, j, Citadel.configs.SQUARE));
          // var text = Citadel.game.add.text(i * Citadel.configs.SQUARE.size, j * Citadel.configs.SQUARE.size, i + "|" + j, style);
          // if(!this.checkMapFree(i, j) || i == 0 || j == 0) {
          //     var text = Citadel.game.add.text(i * Citadel.configs.SQUARE.size, j * Citadel.configs.SQUARE.size, i + "|" + j, style);
          // }
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
