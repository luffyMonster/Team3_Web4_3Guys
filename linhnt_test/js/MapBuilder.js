class MapBuilder {
    constructor(level, configs) {
      this.level = level;
      this.configs = configs.map;
      this.init(configs);
    }

    init(configs) {
      Citadel.game.physics.startSystem(Phaser.Physics.ARCADE);
      Citadel.keyboard = Citadel.game.input.keyboard;
      Citadel.mouse = Citadel.game.input;
      Citadel.enemyController = new EnemyController();

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
      this.TIME_TO_NEXT_WAVE = Citadel.configs.TIME_TO_NEXT_WAVE;
      Citadel.play = true;
      Citadel.pause = false;
      Citadel.lose = false;

      document.addEventListener("nextWave", this.nextWaveHandler.bind(this));
      document.addEventListener("nextLevel", this.nextLevelHandler.bind(this));

      this.event = {
        nextWave : new CustomEvent("nextWave", {detail: "Event call when next level is coming!"}),
        nextLevel : new CustomEvent("nextLevel", {detail: "Event call when next wave is coming!"})
      };
    }

    mapConfigs() {
      return this.level < this.configs.length ? this.configs[this.level] : null;
    }

    waveConfigs() {
      if(this.mapConfigs())
        return this.wave < this.mapConfigs().wave.length ? this.mapConfigs().wave[this.wave] : null;
    }

    reset() {
      //TODO : clearmap
      Citadel.background.frameName = this.mapConfigs().background;
    }

    nextLevelHandler() {
      console.log("next level");
      this.level++;
      this.reset();
      this.endWave = false;
      this.timeSinceLastEnemy = 0;
      this.wave = -1;
      document.dispatchEvent(this.event.nextWave);

      // Citadel.enemyController.get("type6");

      // console.log(this);
      // this.changeMap(++this.level);
      // this.wave = 0;
      // document.dispatchEvent(this.event["nextWave"]);
    }

    changeMap(level) {
      // this.level = (level > this.configs.length) ? level % this.configs.length : level - 1;
      // this.reset(this.mapConfigs());
    }

    nextWaveHandler(evt, info) {
      this.wave++;
      this.timeSinceLastEnemy = 0;
      this.timeSinceLastWave = 0;
      if(this.waveConfigs()) {
        this.timeToNextEnemy = this.waveConfigs().timeEnemyReborn;
      } else {
        // document.dispatchEvent(this.event.nextLevel);
        this.endWave = true;
      }
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

    update() {
      var timeSinceLastUpdate = Citadel.game.time.physicsElapsed * 1000;
      var configs = this.waveConfigs();
      if(Citadel.play && !Citadel.pause) {
          if(this.endWave) {
            var count = 0;
            Citadel.enemyGroup.forEachAlive(function() {
                count++;
            });
            if(count == 0) {
              document.dispatchEvent(this.event.nextLevel);
            }
          } else if(this.wave > -1 && configs) {
              if(this.timeSinceLastWave > this.TIME_TO_NEXT_WAVE) {
                  if(this.timeSinceLastEnemy > this.timeToNextEnemy) {
                      var i = 0;
                      for( ; i < configs.enemy.length; i++) {
                        if(configs.enemy[i].number > 0) {
                          Citadel.enemyController.get(configs.enemy[i].name);
                          configs.enemy[i].number--;
                          this.timeSinceLastEnemy = 0;
                          break;
                        }
                      }
                      if(i >= configs.enemy.length) {
                        document.dispatchEvent(this.event.nextWave);
                      }
                  } else {
                    this.timeSinceLastEnemy += timeSinceLastUpdate;
                  }
              } else {
                this.timeSinceLastWave += timeSinceLastUpdate;
              }
          }
      } else {

      }
    }
}
