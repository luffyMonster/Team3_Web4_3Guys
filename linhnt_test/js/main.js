var Citadel = {};

Citadel.configs = {
  GAME_WIDTH: 1200,
  GAME_HEIGHT: 600,
  SQUARE: {
    size: 30
  }
};

window.onload = function() {
  Citadel.game = new Phaser.Game(
    Citadel.configs.GAME_WIDTH,
    Citadel.configs.GAME_HEIGHT,
    Phaser.AUTO,
    '',
    {
      preload: preload,
      create: create,
      update: update,
      render: render
    },
    false,
    false
  );
}

var CLASS = {
  // laserWeapon: {};
};

var preload = function() {
    Citadel.game.scale.minWidth = 600;
    Citadel.game.scale.minHeight = 300;
    Citadel.game.scale.maxWidth = 1200;
    Citadel.game.scale.maxHeight = 600;
    Citadel.game.scale.pageAlignHorizontally = true;
    Citadel.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    Citadel.game.load.atlasJSONHash('assets', 'Assets/mob.png', 'Assets/mob.json');
    // Citadel.game.load.image('background', '../img/MapTD/grass-1.png');
    Citadel.game.time.advancedTiming = true;

}

var create = function() {
  Citadel.game.physics.startSystem(Phaser.Physics.ARCADE);
  Citadel.keyboard = Citadel.game.input.keyboard;

  Citadel.squareGroup = Citadel.game.add.physicsGroup();
  Citadel.mouse = Citadel.game.input;

  Citadel.dragSprite = Citadel.game.add.sprite(0, 0, 'assets', '22073/0.png');
  Citadel.game.physics.enable(Citadel.dragSprite, Phaser.Physics.ARCADE);
  Citadel.dragSprite.body.collideWorldBounds = true;
  Citadel.dragSprite.enable = false;
  Citadel.dragSprite.update = dragSpriteUpdate;
  Citadel.dragSprite.anchor.setTo(0.5, 0.5);

  Citadel.I = Citadel.configs.GAME_WIDTH / Citadel.configs.SQUARE.size;
  Citadel.J = Citadel.configs.GAME_HEIGHT / Citadel.configs.SQUARE.size;

  for(var j = 0; j < Citadel.J; j++) {
    for(var i = 0; i < Citadel.I; i++) {
      if(j == parseInt(Citadel.J) - 3) {
        if(i % 3 == 0) {
          var sprite = Citadel.game.add.sprite(i * Citadel.configs.SQUARE.size, j * Citadel.configs.SQUARE.size, 'assets', i % 2 == 0 ? '22073/10.png' : '22073/20.png');
          sprite.inputEnabled = true;
          sprite.events.onInputDown.add(onClickSprite, this);
          sprite.size = i % 2 + 1;
          sprite.scale.setTo(Citadel.configs.SQUARE.size * sprite.size / sprite.width,
                  Citadel.configs.SQUARE.size * sprite.size / sprite.height);
          sprite.anchor.setTo(1 / (Math.pow(2, sprite.size)));
        }
      } else if (j < parseInt(Citadel.J) - 3){
        var graphic = Citadel.game.add.graphics(i * Citadel.configs.SQUARE.size, j * Citadel.configs.SQUARE.size);
        Citadel.squareGroup.add(graphic);

        // graphic.beginFill((i + j) % 2 == 0 ? "0x64E328" : "0xFDFEFE");
        graphic.beginFill("0x64E328");
        graphic.lineStyle(3, 0xffd900, 1);
        graphic.moveTo(1, 1);
        graphic.lineTo(Citadel.configs.SQUARE.size - 2, 1);
        graphic.lineTo(Citadel.configs.SQUARE.size - 2, Citadel.configs.SQUARE.size - 2);
        graphic.lineTo(1, Citadel.configs.SQUARE.size - 2);
        graphic.lineTo(1, 1);
        graphic.endFill();

        graphic.isFree = true;
        graphic.alpha = 0;
        graphic.update = graphicUpdate;
        graphic.i = i;
        graphic.j = j;
        graphic.nextRight = squareNextRight;
        graphic.nextDown = squareNextDown;
      }
    }
  }

  Citadel.mouse.onDown.add(gameClick, this);
}

function onClickSprite(target) {
  Citadel.dragSprite.clonedTarget = target;
  Citadel.dragSprite.frame = target.frame;
  Citadel.dragSprite.scale = target.scale;
  Citadel.dragSprite.anchor = target.anchor;
  Citadel.dragSprite.enable = true;
}

function gameClick() {
  if(Citadel.dragSprite.enable) {
    Citadel.dragSprite.enable = false;
    tryDropTower(Citadel.dragSprite.clonedTarget, Citadel.mouse.activePointer.x, Citadel.mouse.activePointer.y);
  } else {

  }
}

function squareNextRight() {
// console.log("this: " + this.i + " | " + this.j );
// console.log("this index calcul: " + (this.j * Citadel.configs.GAME_WIDTH / Citadel.configs.SQUARE.size + this.i));
// console.log("this index real: " + Citadel.squareGroup.children.indexOf(this));
// var nextRight = Citadel.squareGroup.children[this.j * Citadel.I + this.i + 1];
// console.log("nextRight: " + nextRight.i + " | " + nextRight.j);
// console.log("nextRight index calcul: " + (nextRight.j * Citadel.configs.GAME_WIDTH / Citadel.configs.SQUARE.size + nextRight.i));
// console.log("nextRight index real: " + Citadel.squareGroup.children.indexOf(nextRight));
  return this.i < Citadel.I - 1 ? Citadel.squareGroup.children[this.j * Citadel.I + this.i + 1] : null;
}

function squareNextDown() {
  // console.log("this: " + this.i + " | " + this.j );
  // var nextDown = Citadel.squareGroup.children[(this.j + 1) * Citadel.I + this.i];
  // console.log("nextDown: " + nextDown.i + " | " + nextDown.j);
  // console.log("nextDown index calcul: " + (nextDown.j * Citadel.configs.GAME_WIDTH / Citadel.configs.SQUARE.size + nextDown.i));
  // console.log("nextDown index real: " + Citadel.squareGroup.children.indexOf(nextDown));
  return this.j < Citadel.J - 1 ? Citadel.squareGroup.children[(this.j + 1) * Citadel.I + this.i] : null;
}

function tryDropTower(target, mouseX, mouseY) {
  var squareStart;
  if((squareStart = getSquareStart(mouseX, mouseY)) && canDropTower(squareStart, target)) {
    dropTower(squareStart, target);
  }
}

function canDropTower(squareStart, target) {
  var i = 0;
  var goRight = squareStart;
  while(i < target.size) {
    var j = 0;
    var goDown = goRight;
    while(j < target.size) {
      if(!goDown || !goDown.isFree) {
        return false;
      }
      goDown = goDown.nextDown();
      j++;
    }
    goRight = goRight.nextRight();
    i++;
  }
  return true;
}

function dropTower(squareStart, target) {
  squareStart.childTower = Citadel.game.add.sprite(squareStart.x + Citadel.configs.SQUARE.size / 2, squareStart.y + Citadel.configs.SQUARE.size / 2, 'assets', '22073/1.png');
  squareStart.childTower.scale = target.scale;
  squareStart.childTower.anchor = target.anchor;

  squareStart.childTower.animations.add('walk', Phaser.Animation.generateFrameNames('22073/', target.frame, target.frame + 1, '.png', 1), 10, true, false);
  squareStart.childTower.animations.play('walk', 10, true);

  //TODO set for all square in target size

  var i = 0;
  var goRight = squareStart;
  while(i < target.size) {
    var j = 0;
    var goDown = goRight;
    while(j < target.size) {
      goDown.alpha = 0;
      goDown.dragOver = false;
      goDown.isFree = false;
      goDown.childTower = squareStart.childTower;
      goDown = goDown.nextDown();
      j++;
    }
    goRight = goRight.nextRight();
    i++;
  }
}

function getSquareStart(mouseX, mouseY) {
  for(var i = 0; i < Citadel.squareGroup.children.length; i++) {
    var child = Citadel.squareGroup.children[i];
    if(child.x < mouseX && mouseX < child.x + Citadel.configs.SQUARE.size && child.y < mouseY && mouseY < child.y + Citadel.configs.SQUARE.size) {
      return child;
    }
  }
}

function dragSpriteUpdate() {
  if(this.enable) {
    this.alpha = 0.8;
    this.x = Citadel.game.input.x;
    this.y = Citadel.game.input.y;
    onDragOver(this.x, this.y);
  } else {
    this.alpha = 0;
  }
}

function graphicUpdate() {
  if(this.dragOver && Citadel.dragSprite.enable) {
    this.alpha = canDropTower(this, Citadel.dragSprite.clonedTarget) ? 1 : 0.5;
  } else {
    this.alpha = 0;
  }
}

function onDragOver(mouseX, mouseY) {
  Citadel.squareGroup.children.forEach(function(child, i) {
    if(child.x < mouseX && mouseX < child.x + Citadel.configs.SQUARE.size && child.y < mouseY && mouseY < child.y + Citadel.configs.SQUARE.size) {
      child.dragOver = true;
    } else {
      child.dragOver = false;
    }
  })
}

var update = function() {

}

var render = function() {

}
