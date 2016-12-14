var Citadel = {};

Citadel.configs = {
  GAME_WIDTH: 1200,
  GAME_HEIGHT: 600,
  PLAY_SCREEN_WIDTH: 1080,
  PLAY_SCREEN_HEIGHT: 600,
  map: [
    {
      background: 'map/map1.png',
      occupied: [
        {min: {x: 0, y: 0}, max: {x: 7, y: 3}},
        {min: {x: 0, y: 4}, max: {x: 2, y: 8}},
        {min: {x: 8, y: 2}, max: {x: 11, y: 3}},
        {min: {x: 8, y: 4}, max: {x: 9, y: 6}},
        {min: {x: 10, y: 5}, max: {x: 10, y: 6}},
        {min: {x: 10, y: 5}, max: {x: 15, y: 6}},
        {min: {x: 14, y: 2}, max: {x: 15, y: 6}},
        {min: {x: 16, y: 2}, max: {x: 21, y: 3}},
        {min: {x: 20, y: 4}, max: {x: 21, y: 10}},
        {min: {x: 22, y: 7}, max: {x: 25, y: 9}},
        {min: {x: 24, y: 6}, max: {x: 26, y: 6}},
        {min: {x: 14, y: 9}, max: {x: 19, y: 10}},
        {min: {x: 0, y: 12}, max: {x: 1, y: 15}},
        {min: {x: 29, y: 7}, max: {x: 30, y: 7}},
        {min: {x: 29, y: 8}, max: {x: 29, y: 8}},
        {min: {x: 23, y: 11}, max: {x: 24, y: 11}},
        {min: {x: 28, y: 11}, max: {x: 30, y: 11}},
        {min: {x: 14, y: 11}, max: {x: 15, y: 17}},
        {min: {x: 14, y: 18}, max: {x: 18, y: 19}},
        {min: {x: 17, y: 16}, max: {x: 21, y: 17}},
        {min: {x: 20, y: 13}, max: {x: 21, y: 15}},
        {min: {x: 22, y: 13}, max: {x: 27, y: 14}},
        {min: {x: 26, y: 15}, max: {x: 27, y: 17}},
        {min: {x: 28, y: 16}, max: {x: 35, y: 17}},
        {min: {x: 27, y: 0}, max: {x: 28, y: 1}},
        {min: {x: 32, y: 1}, max: {x: 35, y: 6}},
        {min: {x: 15, y: 16}, max: {x: 17, y: 17}}
      ],
      enemyRoute: [
        {x: 0, y: 75},
        {x: 255, y: 75},
        {x: 255, y: 165},
        {x: 435, y: 165},
        {x: 435, y: 75},
        {x: 615, y: 75},
        {x: 615, y: 285},
        {x: 435, y: 285},
        {x: 435, y: 495},
        {x: 615, y: 495},
        {x: 615, y: 405},
        {x: 795, y: 405},
        {x: 795, y: 495},
        {x: 1060, y: 495}
      ],
      wave: [
        {
          enemy: [
            {
              type: "type1",
              number: 1
            },
            {
              type: "type2",
              number: 1
            }
          ],
          timeEnemyReborn: 10
        }
      ]
    },
    {
      background: 'map/map2.png',
      occupied: [
		  {min: {x: 0, y: 0}, max: {x: 1, y: 1}},
		  {min: {x: 2, y: 0}, max: {x: 2, y: 0}},
		  {min: {x: 4, y: 0}, max: {x: 6, y: 3}},
		  {min: {x: 10, y: 0}, max: {x: 14, y: 1}},
		  {min: {x: 15, y: 0}, max: {x: 17, y: 2}},
		  {min: {x: 28, y: 0}, max: {x: 30, y: 2}},
		  {min: {x: 7, y: 3}, max: {x: 9, y: 4}},
		  {min: {x: 10, y: 3}, max: {x: 11, y: 3}},
		  {min: {x: 12, y: 3}, max: {x: 16, y: 10}},
		  {min: {x: 4, y: 5}, max: {x: 9, y: 6}},
		  {min: {x: 0, y: 6}, max: {x: 3, y: 7}},
		  {min: {x: 4, y: 9}, max: {x: 11, y: 10}},
		  {min: {x: 18, y: 0}, max: {x: 23, y: 0}},
		  {min: {x: 18, y: 1}, max: {x: 19, y: 1}},
		  {min: {x: 17, y: 3}, max: {x: 25, y: 4}},
		  {min: {x: 26, y: 3}, max: {x: 28, y: 6}},
		  {min: {x: 26, y: 7}, max: {x: 26, y: 7}},
		  {min: {x: 29, y: 3}, max: {x: 31, y: 10}},
		  {min: {x: 35, y: 1}, max: {x: 35, y: 1}},
		  {min: {x: 0, y: 9}, max: {x: 0, y: 9}},
		  {min: {x: 1, y: 13}, max: {x: 2, y: 14}},
		  {min: {x: 4, y: 11}, max: {x: 5, y: 18}},
		  {min: {x: 3, y: 19}, max: {x: 4, y: 19}},
		  {min: {x: 6, y: 19}, max: {x: 8, y: 19}},
		  {min: {x: 6, y: 17}, max: {x: 13, y: 18}},
		  {min: {x: 12, y: 11}, max: {x: 14, y: 16}},
		  {min: {x: 21, y: 6}, max: {x: 24, y: 8}},
		  {min: {x: 20, y: 7}, max: {x: 20, y: 7}},
		  {min: {x: 20, y: 9}, max: {x: 21, y: 9}},
		  {min: {x: 15, y: 1}, max: {x: 16, y: 12}},
		  {min: {x: 23, y: 9}, max: {x: 28, y: 12}},
		  {min: {x: 29, y: 11}, max: {x: 31, y: 18}},
		  {min: {x: 32, y: 17}, max: {x: 35, y: 18}},
		  {min: {x: 22, y: 14}, max: {x: 23, y: 16}},
		  {min: {x: 20, y: 15}, max: {x: 21, y: 17}},
		  {min: {x: 17, y: 11}, max: {x: 19, y: 11}}
      ]
    },
	{
      background: 'Assets/map3.png',
      occupied: [
		  {min: {x: 0, y: 0}, max: {x: 3, y: 1}},
		  {min: {x: 0, y: 2}, max: {x: 1, y: 2}},
		  {min: {x: 0, y: 9}, max: {x: 1, y: 10}},
		  {min: {x: 0, y: 15}, max: {x: 13, y: 19}},
		  {min: {x: 3, y: 2}, max: {x: 27, y: 3}},
		  {min: {x: 3, y: 5}, max: {x: 4, y: 10}},
		  {min: {x: 25, y: 0}, max: {x: 28, y: 0}},
		  {min: {x: 27, y: 1}, max: {x: 28, y: 1}},
		  {min: {x: 0, y: 12}, max: {x: 17, y: 13}},
		  {min: {x: 11, y: 10}, max: {x: 12, y: 11}},
		  {min: {x: 5, y: 9}, max: {x: 9, y: 10}},
		  {min: {x: 5, y: 14}, max: {x: 6, y: 14}},
		  {min: {x: 11, y: 14}, max: {x: 13, y: 14}},
		  {min: {x: 8, y: 6}, max: {x: 9, y: 8}},
		  {min: {x: 10, y: 6}, max: {x: 14, y: 7}},
		  {min: {x: 12, y: 8}, max: {x: 14, y: 10}},
		  {min: {x: 15, y: 9}, max: {x: 18, y: 10}},
		  {min: {x: 16, y: 6}, max: {x: 18, y: 8}},
		  {min: {x: 19, y: 6}, max: {x: 22, y: 7}},
		  {min: {x: 25, y: 5}, max: {x: 33, y: 6}},
		  {min: {x: 31, y: 0}, max: {x: 33, y: 4}},
		  {min: {x: 21, y: 8}, max: {x: 22, y: 13}},
		  {min: {x: 23, y: 12}, max: {x: 28, y: 13}},
		  {min: {x: 34, y: 7}, max: {x: 35, y: 8}},
		  {min: {x: 15, y: 14}, max: {x: 17, y: 16}},
		  {min: {x: 14, y: 17}, max: {x: 15, y: 18}},
		  {min: {x: 26, y: 8}, max: {x: 28, y: 11}},
		  {min: {x: 18, y: 15}, max: {x: 33, y: 16}},
		  {min: {x: 29, y: 8}, max: {x: 33, y: 9}},
		  {min: {x: 31, y: 10}, max: {x: 33, y: 14}},
		  {min: {x: 26, y: 19}, max: {x: 27, y: 19}},
		  {min: {x: 25, y: 4}, max: {x: 27, y: 4}}
      ]
    }
  ],
  menu: {
    margin: 10
  },
  SQUARE: {
    size: 30,
    fillColor: "0x64E328",
    lineColor: "0xffd900",
    lineWidth: 6,
    lineAlpha: 1
  },
  towerChoser: [
    {
      size: 1
    },
    {
      size: 2
    },
    {
      size: 3
    }
  ],
  enemy: [
    {
      name: "type1",
      frame: "enemy/type1/idle/001.png",
      "class": EnemyCake,
      speed: 100,
      size: {
        width: 50,
        height: 50
      },
      animations: {
        idle: {
            frameCount: 7,
            fps: 10
        },
        left: {
            frameCount: 14,
            fps: 10
        }
      }
    },
    {
      name: "type2",
      frame: "enemy/type2/idle/001.png",
      "class": EnemyTiger1,
      speed: 100,
      size: {
        width: 50,
        height: 50
      },
      animations: {
        idle: {
            frameCount: 7,
            fps: 10
        },
        front: {
            frameCount: 4,
            fps: 10
        },
        back: {
            frameCount: 4,
            fps: 10
        },
        left: {
            frameCount: 4,
            fps: 10
        },
        right: {
            frameCount: 4,
            fps: 10
        }
      }
    },
    {
      name: "type3",
      frame: "enemy/type3/idle/001.png",
      "class": EnemyDragon1,
      speed: 100,
      size: {
        width: 50,
        height: 50
      },
      animations: {
        idle: {
            frameCount: 3,
            fps: 10
        },
        front: {
            frameCount: 6,
            fps: 10
        },
        back: {
            frameCount: 6,
            fps: 10
        },
        right: {
            frameCount: 5,
            fps: 10
        }
      }
    },
    {
      name: "type4",
      frame: "enemy/type4/idle/001.png",
      "class": EnemyDragon2,
      speed: 100,
      size: {
        width: 50,
        height: 50
      },
      animations: {
        idle: {
            frameCount: 4,
            fps: 10
        },
        front: {
            frameCount: 6,
            fps: 10
        },
        back: {
            frameCount: 7,
            fps: 10
        },
        right: {
            frameCount: 5,
            fps: 10
        }
      }
    },
    {
      name: "type5",
      frame: "enemy/type5/idle/001.png",
      "class": EnemyWarrior,
      speed: 100,
      size: {
        width: 50,
        height: 50
      },
      animations: {
        idle: {
            frameCount: 4,
            fps: 10
        },
        front: {
            frameCount: 3,
            fps: 10
        },
        back: {
            frameCount: 3,
            fps: 10
        },
        left: {
            frameCount: 3,
            fps: 10
        }
      }
    }
  ],
  tower: [

  ],
  weapon: [

  ],
  bullet: [

  ]
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

var preload = function() {
    Citadel.game.scale.minWidth = 600;
    Citadel.game.scale.minHeight = 300;
    Citadel.game.scale.maxWidth = 1200;
    Citadel.game.scale.maxHeight = 600;
    Citadel.game.scale.pageAlignHorizontally = true;
    Citadel.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    Citadel.game.load.atlasJSONHash('assets', 'Assets/mob.png', 'Assets/mob.json');
    Citadel.game.load.image('bullet', 'Assets/33.png');
    Citadel.game.time.advancedTiming = true;
}

var create = function() {
  Citadel.map = new MapBuilder(1, Citadel.configs);

  Citadel.map.level = 0;
  Citadel.map.nextLevel();
}

var update = function() {

}

var render = function() {

}

function onClickTowerChoser(target) {
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

function fire(source){
  var direct = new Phaser.Point(Citadel.game.rnd.integerInRange(-10, 10), Citadel.game.rnd.integerInRange(-10, 10));
  var bullet = new Bullet(source.position, direct, 'bullet');
}

function dropTower(squareStart, target) {
  squareStart.childTower = Citadel.game.add.sprite(squareStart.x + Citadel.configs.SQUARE.size * target.size / 2, squareStart.y + Citadel.configs.SQUARE.size * target.size / 2, 'assets', target.frame);
  squareStart.childTower.scale = target.scale;
  squareStart.childTower.anchor.setTo(0.5);
  squareStart.childTower.update = function() {
    this.rotation += 0.01;
  }
  //fire...
  squareStart.childTower.inputEnabled = true;
  squareStart.childTower.events.onInputDown.add(fire, this, squareStart.childTower);

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
