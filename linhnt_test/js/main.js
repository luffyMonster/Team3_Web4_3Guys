var Citadel = {};

Citadel.configs = {
  GAME_WIDTH: 1200,
  GAME_HEIGHT: 600,
  SQUARE: {
    size: 30
  },
  MAP1: {
    background: 'map/map1.png',
    occupied: [
      {min: {x: 0, y: 0}, max: {x: 8, y: 2}},
      {min: {x: 9, y: 2}, max: {x: 12, y: 2}},
      {min: {x: 2, y: 2}, max: {x: 24, y: 2}},
      {min: {x: 36, y: 1}, max: {x: 39, y: 5}},
      {min: {x: 0, y: 3}, max: {x: 2, y: 6}},
      {min: {x: 9, y: 3}, max: {x: 10, y: 5}},
      {min: {x: 11, y: 4}, max: {x: 14, y: 5}},
      {min: {x: 15, y: 3}, max: {x: 17, y: 5}},
      {min: {x: 22, y: 3}, max: {x: 24, y: 8}},
      {min: {x: 15, y: 7}, max: {x: 21, y: 8}},
      {min: {x: 15, y: 9}, max: {x: 17, y: 14}},
      {min: {x: 15, y: 14}, max: {x: 20, y: 15}},
      {min: {x: 18, y: 13}, max: {x: 22, y: 14}},
      {min: {x: 22, y: 10}, max: {x: 24, y: 14}},
      {min: {x: 25, y: 10}, max: {x: 28, y: 11}},
      {min: {x: 29, y: 10}, max: {x: 30, y: 14}},
      {min: {x: 31, y: 13}, max: {x: 39, y: 14}}]
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
    Citadel.game.time.advancedTiming = true;
}

var create = function() {
  Citadel.game.physics.startSystem(Phaser.Physics.ARCADE);
  Citadel.keyboard = Citadel.game.input.keyboard;

  Citadel.background = Citadel.game.add.sprite(0, 0,'assets', 'map/map1.png');
  //(
  Citadel.background.scale.setTo(Citadel.configs.GAME_WIDTH / Citadel.background.width, (Citadel.configs.GAME_HEIGHT - 4 * Citadel.configs.SQUARE.size) / Citadel.background.height);
  //)
  Citadel.squareGroup = Citadel.game.add.physicsGroup();
  Citadel.mouse = Citadel.game.input;

  // Citadel.dragSprite = new Phaser.Sprite(Citadel.game, 0, 0, 'assets', 'tower/type1/idle/001.png');
  Citadel.dragSprite = Citadel.game.add.sprite(0, 0, 'assets', 'tower/type1/idle/001.png');
  console.log(Citadel.dragSprite);

  Citadel.game.physics.enable(Citadel.dragSprite, Phaser.Physics.ARCADE);
  Citadel.dragSprite.body.collideWorldBounds = true;
  Citadel.dragSprite.enable = false;
  Citadel.dragSprite.update = dragSpriteUpdate;
  Citadel.dragSprite.anchor.setTo(0.5, 0.5);

  Citadel.I = Citadel.configs.GAME_WIDTH / Citadel.configs.SQUARE.size;
  Citadel.J = Citadel.configs.GAME_HEIGHT / Citadel.configs.SQUARE.size;

  // var style = { font: "12px Arial", fill: "#ff0044", wordWrap: true, wordWrapWidth: Citadel.configs.SQUARE.size, align: "center"};

  for(var j = 0; j < Citadel.J; j++) {
    for(var i = 0; i < Citadel.I; i++) {
      if(j == parseInt(Citadel.J) - 3) {
        if(i % 4 == 0) {
          var sprite = Citadel.game.add.sprite(i * Citadel.configs.SQUARE.size, j * Citadel.configs.SQUARE.size, 'assets', 'tower/type1/idle/' + (i % 3 == 0 ? '001.png' : '002.png'));
          sprite.inputEnabled = true;
          sprite.events.onInputDown.add(onClickSprite, this);
          sprite.size = i % 3 + 1;
          sprite.scale.setTo(Citadel.configs.SQUARE.size * sprite.size / sprite.width,
                  Citadel.configs.SQUARE.size * sprite.size / sprite.height);
          sprite.anchor.setTo(1 / (Math.pow(2, sprite.size)));
        }
      } else if (j < parseInt(Citadel.J) - 4){

        // text = Citadel.game.add.text(i * Citadel.configs.SQUARE.size, j * Citadel.configs.SQUARE.size, i + "|" + j, style);
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

        graphic.alpha = 0.1;
        graphic.update = graphicUpdate;
        graphic.i = i;
        graphic.j = j;
        graphic.nextRight = squareNextRight;
        graphic.nextDown = squareNextDown;
        graphic.isFree = checkMapFree(i, j);
      }
    }
  }

  Citadel.mouse.onDown.add(gameClick, this);
}

function checkMapFree(x, y) {
  var occupieds = Citadel.configs.MAP1.occupied;
  for(var i = 0; i < occupieds.length; i++) {
    var occupied = occupieds[i];
    if(occupied.min.x <= x && x <= occupied.max.x && occupied.min.y <= y && y <= occupied.max.y) {
      return false;
    }
  }
  return true;
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
  return this.i < Citadel.I - 1 ? Citadel.squareGroup.children[this.j * Citadel.I + this.i + 1] : null;
}

function squareNextDown() {
  return this.j < Citadel.J - 1 ? Citadel.squareGroup.children[(this.j + 1) * Citadel.I + this.i] : null;
}

function tryDropTower(target, mouseX, mouseY) {
  var squareStart;
  if((squareStart = getSquareStart(mouseX, mouseY)) && canDropTower(squareStart, target)) {
    dropTower(squareStart, target);
  }
}

function canDropTower(squareStart, target, canBeNotStart) {
  if(canBeNotStart) {
    return squareStart.isFree;
  } else {
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
}

function dropTower(squareStart, target) {
  squareStart.childTower = Citadel.game.add.sprite(squareStart.x + Citadel.configs.SQUARE.size / 2, squareStart.y + Citadel.configs.SQUARE.size / 2, 'assets', 'tower/type1/idle/001.png');
  squareStart.childTower.scale = target.scale;
  squareStart.childTower.anchor = target.anchor;

  squareStart.childTower.animations.add('idle', Phaser.Animation.generateFrameNames('tower/type1/idle/', 0, 1, '.png', 3), 10, true, false);
  squareStart.childTower.animations.play('idle', 10, true);

  var i = 0;
  var goRight = squareStart;
  while(i < target.size) {
    var j = 0;
    var goDown = goRight;
    while(j < target.size) {
      goDown.alpha = 0.1;
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
    this.alpha = canDropTower(this, Citadel.dragSprite.clonedTarget, true) ? 1 : 0.5;
  } else {
    this.alpha = 0.1;
  }
}

function onDragOver(mouseX, mouseY) {
  Citadel.squareGroup.children.forEach(function(child, i) {
    if(child.x - Citadel.configs.SQUARE.size * (Citadel.dragSprite.clonedTarget.size - 1) < mouseX && mouseX < child.x + Citadel.configs.SQUARE.size
      && child.y - Citadel.configs.SQUARE.size * (Citadel.dragSprite.clonedTarget.size - 1) < mouseY && mouseY < child.y + Citadel.configs.SQUARE.size) {
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
