class MapBuilder {
    constructor(configs) {
      this.configs = configs;
      this.setup();
    }

    setup() {
      Citadel.game.physics.startSystem(Phaser.Physics.ARCADE);
      Citadel.keyboard = Citadel.game.input.keyboard;
      Citadel.mouse = Citadel.game.input;

      Citadel.I = Citadel.configs.PLAY_SCREEN_WIDTH / Citadel.configs.SQUARE.size;
      Citadel.J = Citadel.configs.PLAY_SCREEN_HEIGHT / Citadel.configs.SQUARE.size;

      Citadel.background = Citadel.game.add.sprite(0, 0,'assets', 'map/map1.png');
      Citadel.background.scale.setTo(Citadel.configs.PLAY_SCREEN_WIDTH / Citadel.background.width, Citadel.configs.PLAY_SCREEN_HEIGHT / Citadel.background.height);

      Citadel.bulletGroup = Citadel.game.add.physicsGroup();
      Citadel.squareGroup = Citadel.game.add.physicsGroup();

      Citadel.dragSprite = new DragSprite(Citadel.game, 0, 0, 'assets', 'tower/type1/idle/001.png');

      this.addGraphicMatrix();
      this.addTowerChoser();
    }

    changeMap(level) {
      level = parseInt(level) || 1;
      var configs = this.configs[this.configs.length % level];
    }

    checkMapFree(x, y) {
      var occupieds = Citadel.configs.MAP1.occupied;
      for(var i = 0; i < occupieds.length; i++) {
        var occupied = occupieds[i];
        if(occupied.min.x <= x && x <= occupied.max.x && occupied.min.y <= y && y <= occupied.max.y) {
          return false;
        }
      }
      return true;
    }

    addGraphicMatrix() {
      var style = { font: "12px Arial", fill: "#ff0044", wordWrap: true, wordWrapWidth: Citadel.configs.SQUARE.size, align: "center"};
      for(var j = 0; j < Citadel.J; j++) {
        for(var i = 0; i < Citadel.I; i++) {
            // var text = Citadel.game.add.text(i * Citadel.configs.SQUARE.size, j * Citadel.configs.SQUARE.size, i + "|" + j, style);
            var graphic = Citadel.game.add.graphics(i * Citadel.configs.SQUARE.size, j * Citadel.configs.SQUARE.size);
            Citadel.squareGroup.add(graphic);

            graphic.beginFill("0x64E328");
            graphic.lineStyle(3, 0xffd900, 1);
            graphic.moveTo(1, 1);
            graphic.lineTo(Citadel.configs.SQUARE.size - 2, 1);
            graphic.lineTo(Citadel.configs.SQUARE.size - 2, Citadel.configs.SQUARE.size - 2);
            graphic.lineTo(1, Citadel.configs.SQUARE.size - 2);
            graphic.lineTo(1, 1);
            graphic.endFill();

            graphic.alpha = 0.1;
            graphic.update = graphicUpdate;
            graphic.i = i;
            graphic.j = j;
            graphic.nextRight = squareNextRight;
            graphic.nextDown = squareNextDown;
            graphic.isFree = this.checkMapFree(i, j);
            // if(!this.checkMapFree(i, j) || i == 0 || j == 0) {
            //     var text = Citadel.game.add.text(i * Citadel.configs.SQUARE.size, j * Citadel.configs.SQUARE.size, i + "|" + j, style);
            // }
        }
      }
    }

    addTowerChoser() {
      for(var i = 1; i < 4; i++) {
        var sprite = Citadel.game.add.sprite(Citadel.configs.PLAY_SCREEN_WIDTH + 30, i * 50, 'assets', 'tower/type1/idle/001.png');
        sprite.inputEnabled = true;
        sprite.events.onInputDown.add(onClickTowerChoser, this);
        sprite.size = i;
        sprite.scale.setTo(Citadel.configs.SQUARE.size * sprite.size / sprite.width,
                Citadel.configs.SQUARE.size * sprite.size / sprite.height);
        sprite.anchor.setTo(1 / (Math.pow(2, sprite.size)));
      }

      Citadel.mouse.onDown.add(gameClick, Citadel.game);
    }
}
