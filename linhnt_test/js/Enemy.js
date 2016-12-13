class Enemy extends Phaser.Sprite {
  constructor(game, x, y, key, frame, configs) {
    super(game, x, y, key, frame);
    game.add.existing(this);
    this.name = configs.name;
    this.init(configs);
  }

  init(configs) {
    this.addAnimation(configs.animations);
  }

  addAnimation(configs) {
    for(var key in configs) {
      this.animations.add(key, Phaser.Animation.generateFrameNames('enemy/' + this.name + "/" + key + "/", 0, configs[key].frameCount, '.png', 3),
       10, true, false);
    }
    this.animations.play("idle", configs["idle"]);
    this.animationsConfigs = configs;
  }
}
