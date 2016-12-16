class BulletType1 extends Bullet{
  constructor(game, x, y, key, frame, configs){
    super(game, x, y, key, frame, configs);
    this.target = null;
    this.name = this.configs.name;
  }
  setTarget(target){
    this.target = target;
  }
  onCollide(bullet, target){
    console.log(1);
    bullet.kill();
    //Citadel.bulletController.kill(bullet);
  }
  reborn() {
    this.alive = this._exists = this.exists = true;
  }
  reset(direct, x, y){
     this.position.x = x;
     this.position.y = y;
     this.body.velocity = direct.setMagnitude(this.configs.speed);
     this.angle = Math.atan2(this.body.velocity.x, -this.body.velocity.y) * (180/Math.PI) + Math.PI*180/2;
  }
  update(){
    if (!(this.alive)) return;
    this.body.velocity = Phaser.Point.subtract(this.target.position,  this.position).setMagnitude(this.configs.speed);
  }
}
