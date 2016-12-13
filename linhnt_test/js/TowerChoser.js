class TowerChoser extends Phaser.Sprite {
  constructor(game, x, y, key, frame, configs, targetConfigs) {
    super(game, x, y, key, frame);
    game.add.existing(this);
    this.init(configs, targetConfigs);
  }

  init(configs, targetConfigs) {
    this.targetConfigs = targetConfigs;
    this.inputEnabled = true;
    this.events.onInputDown.add(onClickTowerChoser, Citadel.game);
    this.size = configs.size;
    this.scale.setTo(Citadel.configs.SQUARE.size * this.size / this.width,
            Citadel.configs.SQUARE.size * this.size / this.height);
    this.anchor.setTo(1 / (Math.pow(2, this.size)));
  }

}
