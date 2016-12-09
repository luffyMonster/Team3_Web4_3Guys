var Citadel = {};

Citadel.configs = {
  GAME_WIDTH: 1000,
  GAME_HEIGHT: 600
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
    Citadel.game.scale.minWidth = 500;
    Citadel.game.scale.minHeight = 300;
    Citadel.game.scale.maxWidth = 1000;
    Citadel.game.scale.maxHeight = 600;
    Citadel.game.scale.pageAlignHorizontally = true;
    Citadel.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    Citadel.game.load.atlasJSONHash('assets', 'Assets/assets.png', 'Assets/assets.json');
    Citadel.game.load.image('background', 'Assets/Map1.png');
    Citadel.game.time.advancedTiming = true;
}

var create = function() {
  Citadel.game.physics.startSystem(Phaser.Physics.ARCADE);
  Citadel.keyboard = Citadel.game.input.keyboard;
  // Citadel.background = Citadel.game.add.tileSprite(0, 0, Citadel.configs.GAME_WIDTH, Citadel.configs.GAME_HEIGHT, 'background');

  Citadel.squareGroup = Citadel.game.add.physicsGroup();
  Citadel.mouse = Citadel.game.input;
  // Citadel.game.input.mouse.enabled = true;

  Citadel.dragSprite = Citadel.game.add.sprite(0, 0, 'assets', 'Spaceship2-Player.png');
  Citadel.game.physics.enable(Citadel.dragSprite, Phaser.Physics.ARCADE);
  Citadel.dragSprite.body.collideWorldBounds = true;
  Citadel.dragSprite.enable = false;
  Citadel.dragSprite.update = dragSpriteUpdate;
  Citadel.dragSprite.anchor.setTo(0.5, 0.5);

  for(var i = 0; i < 10; i++) {
    for(var j = 0; j < 6; j++) {
      if(j == 5) {
        var sprite = Citadel.game.add.sprite(i * 100, j * 100, 'assets', i % 2 == 0 ? 'Spaceship1-Player.png' : 'Spaceship3-Player.png');
        sprite.size = i / 2 + 1;
        sprite.inputEnabled = true;
        sprite.events.onInputDown.add(onClickSprite, this);
      } else {
        var graphic = Citadel.game.add.graphics(i * 100, j * 100);
        Citadel.squareGroup.add(graphic);
        graphic.beginFill((i + j) % 2 == 0 ? "0x64E328" : "0xFDFEFE");
        graphic.lineStyle(3, 0xffd900, 1);
        graphic.moveTo(1, 1);
        graphic.lineTo(98, 1);
        graphic.lineTo(98, 98);
        graphic.lineTo(1, 98);
        graphic.lineTo(1, 1);
        graphic.endFill();
        graphic.alpha = 0.5;
        graphic.update = graphicUpdate;
      }
    }
  }

  Citadel.mouse.onDown.add(gameClick, this);
}

function onClickSprite(target) {
  Citadel.dragSprite.clonedTarget = target;
  Citadel.dragSprite.frameName = target.frameName;
  Citadel.dragSprite.enable = true;
}

function gameClick() {
  if(Citadel.dragSprite.enable) {
    canDrop(Citadel.dragSprite.clonedTarget, Citadel.mouse.activePointer.x, Citadel.mouse.activePointer.y);
  } else {

  }
}

function canDrop(target, mouseX, mouseY) {
  console.log(target.x + " | " + target.y + " to>> " + mouseX + " | " + mouseY);
  Citadel.dragSprite.enable = false;
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
    this.alpha = 1;
  } else {
    this.alpha = 0.5;
  }
}

function onDragOver(mouseX, mouseY) {
  Citadel.squareGroup.children.forEach(function(child, i) {
    if(child.x < mouseX && mouseX < child.x + 100 && child.y < mouseY && mouseY < child.y + 100) {
      child.dragOver = true;
    } else {
      child.dragOver = false;
    }
  })
}

function onOverlapOut(ship, square) {
  // console.log("Out");
  // square.alpha = 0.5;
}

var update = function() {


  // Citadel.game.physics.arcade.overlap(Citadel.ship, Citadel.squareGroup, onOverlapOut, onOnverlap);
}

var render = function() {

}
