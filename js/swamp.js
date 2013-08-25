// ========================================= Swamp
function makeSwamp(level, pos, size) {
  var swamp = makeLevelObject(level);
  swamp.pos = pos;
  swamp.size = size;
  swamp.drawActions.push(function() {
    circle(game.bg_ctx, this.pos, this.size, colors.swamp);
  });
  swamp.tickActions.push(function() {
    if (distance(ball.pos, this.pos) < this.size) {  ball.scaleVelocity(swamp_speed_reduction); }
  });
  return swamp;
}