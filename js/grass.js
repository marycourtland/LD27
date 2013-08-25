// ========================================= Grass
function makeGrass(level, pos, size) {
  var grass = makeLevelObject(level);
  grass.pos = pos;
  grass.size = size;
  grass.drawActions.push(function() {
    circle(game.bg_ctx, this.pos, this.size, colors.grass);
  });
  grass.tickActions.push(function() {
    if (distance(ball.pos, this.pos) < this.size) {  ball.scaleVelocity(grass_speed_boost); }
  });
  return grass;
}