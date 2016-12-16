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
      return this.deads[configs.name].shift();
    } else {
      var bullet = new Citadel.configs.bullet[index].class(Citadel.game, 100, 100, 'bullet', null, configs);
      Citadel.bulletGroup.add(bullet);
      return bullet;
    }
  }
}
