class MapBuilder {
    constructor(configs) {
      this.configs = configs;
      setup();
    }

    setup() {
      Citadel.game.physics.startSystem(Phaser.Physics.ARCADE);
      Citadel.keyboard = Citadel.game.input.keyboard;

      Citadel.background = Citadel.game.add.sprite(0, 0,'assets', 'map/map1.png');
    }

    changeMap(level) {
      level = parseInt(level) || 1;
      var configs = this.configs[this.configs.length % level];
    }
}
