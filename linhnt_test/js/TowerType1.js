class TowerType1 extends Tower{
  constructor(game, x, y, key, frame, configs){
    super(game, x, y, key, frame, configs);
    this.radius = 500;
    this.target = null;
    this.timeSinceLastFire = 0;
    this.cooldown = 0.1;
    //fire...
    // var target = Citadel.mouse.activePointer;
    // Citadel.mouse.onDown.add(this.fire, this, target);
  }
  update(){
    this.timeSinceLastFire += Citadel.game.time.physicsElapsed;
    if (!(this.target) || Phaser.Point.subtract(this.target,  this.position).getMagnitude() > this.radius){
      this.target = null;
      this.target = this.getTarget();
    } else {
      this.fire();
    }
  }

  getTarget(){
    var target = null;
    var minDisF =( function(enemy){
      var distance = Phaser.Point.subtract(enemy.position,  this.position).getMagnitude();
      if ( distance < this.radius){
        target = enemy;
      }
    }).bind(this);
    Citadel.enemyGroup.forEachAlive(minDisF);
    return target;
  }

  fire(){
    if (this.timeSinceLastFire < this.cooldown ) return;
    var direct = new Phaser.Point(this.target.x - this.position.x, this.target.y - this.position.y);
    var bullet = Citadel.bulletController.get(0);
    bullet.target = this.target;
    bullet.reset(direct, this.position.x, this.position.y);
    this.angle = bullet.angle + 90;
    this.timeSinceLastFire = 0;
    console.log(Citadel.bulletGroup.children.length);
  }
}
