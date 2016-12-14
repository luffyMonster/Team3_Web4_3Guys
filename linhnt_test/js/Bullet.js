class Bullet extends Phaser.Sprite{
  constructor(game, x, y, direct, key, frame, configs) {
    super(game, x, y, key, frame);
    game.add.existing(this);
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.velocity = direct.setMagnitude(300);
    this.anchor.setTo(0.5, 0.5);
    this.angle = Math.atan2(this.body.velocity.x, -this.body.velocity.y) * (180/Math.PI) + Math.PI*180/2;
  }
  update(){
    if (this.target && this.tween){
      this.tween.timeline[0].vEnd = target.position;
     }
  }
  effect(enemy){
    //TODO
  }
}
