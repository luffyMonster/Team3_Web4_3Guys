class TowerChoser extends Tower {
  constructor(game, x, y, key, frame, configs, targetConfigs){
    super(game, x, y, key, frame, configs, targetConfigs);
    this.init(configs, targetConfigs);
  }

  init(configs, targetConfigs) {
    this.targetConfigs = targetConfigs;
    this.inputEnabled = true;
    this.events.onInputDown.add(this.onClickTowerChoser, Citadel.game);
    this.size = configs.size;
    this.scale.setTo(Citadel.configs.SQUARE.size * this.size / this.width,
            Citadel.configs.SQUARE.size * this.size / this.height);
    this.anchor.setTo(1 / (Math.pow(2, this.size)));
  }
  
  onClickTowerChoser(target) {
    Citadel.dragSprite.clonedTarget = target;
    Citadel.dragSprite.frame = target.frame;
    Citadel.dragSprite.scale = target.scale;
    Citadel.dragSprite.anchor = target.anchor;
    Citadel.dragSprite.enable = true;
  }
}
