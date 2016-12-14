class EnemyController {
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
    var configs = Citadel.configs.enemy[index];
    if(this.deads[configs.name].length > 0) {
      return this.resetEnemy(this.deads[configs.name].shift(), -100, -100, configs);
    } else {
      Citadel.enemyGroup.add(new Citadel.configs.enemy[index].class(Citadel.game, -100, -100, 'assets', configs));
      return Citadel.enemyGroup.children.slice(-1)[0];
    }
  }

  resetEnemy(enemy, x, y, configs) {
    // console.log(enemy);
    enemy.speed = configs.speed;
    enemy.from = enemy.to = undefined;
    enemy.nextDestination();
    enemy.reborn();
    return enemy;
  }

  kill(enemy) {
    enemy.kill();
    // console.log(this.deads[enemy.name].length + " | " + Citadel.enemyGroup.children.length);
    this.deads[enemy.name].push(enemy);
    // Citadel.enemyController.get(0);
  }

}
