// ========================================= The timer
var timer = new GameObject(game);
timer.t0 = null;
timer.result = 0;
timer.start = function() {
  this.t0 = now();
  this.result = 0;
}
timer.stop = function() {
  this.result = this.getTime();
  this.t0 = null;
}
timer.getTime = function() {
  if (game.mode != "running") return this.result;
  return getTimeSince(this.t0)/1000;
}
