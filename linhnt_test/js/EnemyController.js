class EnemyController {
  constructor() {
    this.alives = {
      cake: [],
      tiger1: [],
      tiger2: []
    };
    this.deads = {
      cake: [],
      tiger1: [],
      tiger2: []
    };
  }

  get(name) {
    if(this.deads[name]){

    }
  }

  kill(enemy) {
    enemy.kill();
    if(this.deads.push(this.alives.splice(this.alives.indexOf(enemy), 1)[0])) {

    }

  }

}
