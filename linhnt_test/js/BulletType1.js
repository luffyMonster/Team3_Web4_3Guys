class BulletType1 extends Bullet{
  constructor(game, x, y, key, frame, configs){
    super(game, x, y, key, frame, configs);
    this.target = null;
  }
  setTarget(target){
    this.target = target;
    //overlap
  }
  reset(direct, x, y){
     this.position.x = x;
     this.position.y = y;
     this.body.velocity = direct.setMagnitude(this.configs.speed);
     this.angle = Math.atan2(this.body.velocity.x, -this.body.velocity.y) * (180/Math.PI) + Math.PI*180/2;
  }
  kill(){
    super.kill();
    Citadel.bulletController.deads[this.configs.name].push(enemy);
  }
  update(){
    this.velocity = Phaser.Point.subtract(this.target.position,  this.position).setMagnitude(this.configs.speed);
  }
}