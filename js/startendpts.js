
// ========================================= The start and end points
var start_point = new GameObject(game);
start_point.pos = start_pos;
start_point.draw = function() {
  this.ctx.save();
  this.ctx.globalAlpha = 1;
  circle(this.ctx, this.pos, point_radius, colors.point);
  this.ctx.globalAlpha = 1;
  emptyCircle(this.ctx, this.pos, point_radius - 5, colors.point);
  emptyCircle(this.ctx, this.pos, point_radius - 10, colors.point);
  emptyCircle(this.ctx, this.pos, point_radius - 15, colors.point);
  this.ctx.restore();
}

var end_point = new GameObject(game);
end_point.pos = end_pos;
end_point.draw = start_point.draw;