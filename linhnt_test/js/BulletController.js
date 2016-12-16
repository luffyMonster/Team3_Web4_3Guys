class BulletController{
  constructor() {
    this.deads = {
      type1: [],
      type2: [],
      type3: [],
      type4: [],
      type5: []
    };
  }
  get(index) {
    var configs = Citadel.configs.bullet[index];
    if(this.deads[configs.name].length > 0) {
      var bullet = this.deads[configs.name].shift();
      bullet.reborn();
      return bullet;
    } else {
      Citadel.bulletGroup.add(new Citadel.configs.bullet[index].class(Citadel.game, 0, 0, 'bullet', null, configs));
      return Citadel.bulletGroup.children.slice(-1)[0];
    }
  }
  kill(bullet) {
    bullet.kill();
    // console.log(this.deads[enemy.name].length + " | " + Citadel.enemyGroup.children.length);
    this.deads[bullet.name].push(bullet);
    // Citadel.enemyController.get(0);
  }
}
