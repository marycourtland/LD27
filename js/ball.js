// ========================================= The ball
var ball = new GameObject(game);
ball.pos = start_point.pos.copy();
actuate(ball);
ball.tickActions.push(function() { game.mode == 'running'? this.unfreeze() : this.freeze(); });
navigate(ball, keydirs_lrud, ball_speed);
ball.freeze();
ball.imprints = [];
ball.draw = function() {
  circle(this.ctx, this.pos, ball_radius, colors.ball);
  if (game.mode != "design") {
    // Draw progress
    //text(this.ctx, Math.floor(timer.getTime()).toString(), yshift(this.pos, -2), 'centered', 'white');
    var a = 360 * timer.getTime() / 10;
    filledAngle(this.ctx, this.pos, ball_radius, -90, -90 + a, colors.ball2);
    
    // Draw imprints
    if (leave_ball_imprints && game.mode == 'running') circle(game.imprint_ctx, this.pos, ball_imprint_radius, colors.ball_faded);
    
    this.ctx.restore();
  }
}
ball.start = function() {
  this.velocity = ball_start_velocity.copy();
  this.unfreeze();
  if (leave_ball_imprints) setTimeout(function() { ball.imprint(); }, 1000);
}
ball.stop = function() {
  this.velocity = xy(0, 0);
  this.freeze();
}
ball.reset = function() {
  this.pos = start_point.pos.copy();
  this.imprints = [];
  this.freeze();
}
ball.imprint = function() {
  if (game.mode != "running") return;
  circle(game.imprint_ctx, this.pos, ball_radius, colors.ball_faded);
  setTimeout(function() { ball.imprint(); }, 1000);
}
// Movement effects
ball.reverse = function() {
  this.velocity.neg();
}
ball.scaleVelocity = function(factor) {
  this.velocity_scale *= factor;
}
ball.velocity_scale = 1;
ball._move = ball.move;
ball.move = function(delta) { 
  //if (game.state.frame%50==0) console.log("old: " + delta + " | new: " +  scale(delta, this.velocity_scale));
  this._move(scale(delta, this.velocity_scale));
}
ball.preTickActions.push(function() { this.velocity_scale = 1; });
