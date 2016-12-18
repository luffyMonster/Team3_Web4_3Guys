class EnemyController {
  constructor() {
    this.deads = {
      type1: [],
      type2: [],
      type3: [],
      type4: [],
      type5: [],
      type6: [],
      type7: [],
      type8: [],
      type9: [],
      type10: [],
      type11: [],
      type12: [],
      type13: [],
      type14: [],
      type15: [],
      type16: [],
      type17: [],
      type18: [],
      type19: [],
      type20: [],
      type21: [],
      type22: [],
      type23: [],
      type24: [],
      type25: []
    };
  }

  get(index) {
    console.log(index + " | " + typeof index);
    if(typeof index == 'string') {
      for(var i = 0; i < Citadel.configs.enemy.length; i++){
        if(Citadel.configs.enemy[i].name == index) {
          index = i;
          break;
        }
      }
    }
    var configs = Citadel.configs.enemy[index];

  }

  resetEnemy(enemy, x, y, configs) {
    enemy.invi = undefined;
    enemy.speed = configs.speed;
    enemy.from = enemy.to = undefined;
    enemy.nextDestination();
    enemy.reborn();
    return enemy;
  }

  kill(enemy) {
    // if(!enemy.dying) {
    //   // enemy.kill();
    // }

    enemy.kill();
    this.deads[enemy.name].push(enemy);
    // Citadel.enemyController.get(0);
  }

}
