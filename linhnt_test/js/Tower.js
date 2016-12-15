class Tower extends Phaser.Sprite{
  constructor(game, x, y, key, frame, configs) {
    super(game, x, y, key, frame);
    this.anchor.setTo(0.5);
    game.add.existing(this);
  }
}
