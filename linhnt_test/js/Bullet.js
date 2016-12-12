class Bullet{
  constructor(position, direct, spriteName){
    this.sprite = Citadel.bulletGroup.create(
      position.x,
      position.y,
      spriteName
    );
    this.sprite.body.velocity = direct.setMagnitude(300);
    this.sprite.angle = Math.atan2(
      this.sprite.body.velocity.x,
      -this.sprite.body.velocity.y
    ) * (180/Math.PI) + Math.PI*180/2;
  }
}
