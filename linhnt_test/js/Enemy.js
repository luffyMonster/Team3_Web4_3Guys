class Enemy extends Phaser.Sprite {
  constructor(game, x, y, key, frame, configs) {
    super(game, x, y, key, frame);
    game.add.existing(this);
    this.name = configs.name;
    this.init(configs);
  }

  init(configs) {
    this.addAnimation(configs.animations);
    this.anchor.setTo(0.5);
    this.route = Citadel.map.mapConfigs().enemyRoute;
    this.speed = configs.speed;
    this.fly = configs.fly;
    this.invi = configs.invi;
    this.scale.setTo(configs.size.width / this.width, configs.size.height / this.height);
  }

  nextDestination() {
    if(this.from && this.to){
      this.from = this.to;
      if(this.route.indexOf(this.to) < this.route.length - 1) {
        this.to = this.route[this.route.indexOf(this.to) + 1];
      } else {
        this.to = this.from = undefined;
        this.finish();
      }
    } else {
      this.from = this.route[0];
      this.to = this.route[1];
    }

    if(this.from) {
      this.x = this.from.x;
      this.y = this.from.y;
    }
  }

  finish() {
    Citadel.enemyController.kill(this);
  }

  reborn() {
    this.alive = this._exists = this.exists = true;
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
