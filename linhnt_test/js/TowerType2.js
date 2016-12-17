class TowerType2 extends Tower{
  constructor(game, x, y, key, frame, configs){
    super(game, x, y, key, frame, configs);
    this.target = null;
    this.radiusSprite = null;//TODO
  }
  update(){
    if (!(this.alive)) return;

    Citadel.enemyGroup.forEachAlive((function(enemy){
      console.log(enemy.speed);
      var distance = Phaser.Point.subtract(enemy.position,  this.position).getMagnitude();
      if (distance <= this.radius){
        enemy.speed = (1 - this.slow - this.upgradeSlow)*enemy.configs.speed;
      } else {
        enemy.speed = enemy.configs.speed;
      }
    }).bind(this));
  }
  reborn(){
      this.alive = this._exists = this.exists = true;
  }
  reset( x, y){
     this.position.x = x;
     this.position.y = y;
  }

  upgrade(){
    if (this.level < this.maxLV && Citadel.monneyAmount >= this.upgradePrice) {
      this.level++;
      this.frameName = this.configs.frameUpgrade + this.level + '.png';
    //  console.log(this.frameName);
      //this.textLevel.setText(this.textLevel._text + "/");
      Citadel.monneyAmount -= this.upgradePrice;
      this.radius += this.configs.upgradeRadius;
      this.upgradeSlow += this.configs.upgradeSlow;
    }


  }
  resett(configs){
    this.frameName = configs.frame;
    console.log(this.scale);
    this.configs = configs;
    this.name = configs.name;
    this.cooldown = configs.cooldown;
    this.radius = configs.radius;
    this.price = configs.price;
    this.anchor.setTo(0.5);
    this.inputEnabled = true;
    this.maxLV = configs.maxLV;
    this.level = 0;
    this.slow = configs.slow;
    this.upgradeSlow = 0;
    this.upgradePrice = configs.upgradePrice;
    //
    // var style = { font: "15px Arial", fill: "#00ffff", wordWrap: true, wordWrapWidth: Citadel.configs.PLAY_SCREEN_WIDTH, align: "center"};
    // this.textLevel = Citadel.game.add.text(this.x, this.y + 30, '/', style);
  }
}
