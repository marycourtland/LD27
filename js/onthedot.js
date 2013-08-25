
// ========================================= The game (On the Dot)
var game = new Game({bg_color: colors.bg});
game.setTitle("On The Dot.");
game.setSize(xy(800, 600));
game.setFont(default_font);
window.onload = function() {
  game.levels[game.current_level].onload();
  game.start();
}
// Modes can be "design", "running", or "score"
game.mode = "design";

// Other canvas layers
game.imprint_ctx = document.getElementById("imprint_canvas").getContext("2d");
game.setSize(game.size, game.imprint_ctx);
game.bg_ctx = document.getElementById("background_canvas").getContext("2d");
game.setSize(game.size, game.bg_ctx);

 // HERE LIE MISCELLANEOUS DEBUG STATEMENTS. RIP BUGS
game.finalActions.push(function() {
  //scale(ball.velocity, 100).arrowOn(this.ctx, xy(500, 200)); // Show ball velocity
});

// Detect changes in game mode
game.tickActions.push(function() {
  // Start running the ball/timer
  if (game.mode == "design" && game.isKeyPressed(inputs.start_run)) this.enterRunningMode();
  
  // Player halts the run
  else if (game.mode == "running" && game.isKeyPressed(inputs.halt_run)) { this.endRunningMode(); this.enterDesignMode(); }
  
  // The ball reaches the end
  else if (game.mode == "running" && distance(ball.pos, end_point.pos) < end_point_tolerance) { this.endRunningMode(); this.enterScoreMode(); }
  
  // Player tries again
  else if (game.mode == "score" && game.isKeyPressed(inputs.start_run)) this.enterRunningMode();
  
  // Player goes to next level
  else if (game.mode == "score" && game.isKeyPressed(inputs.next_level)) { this.doNextLevel(); this.enterDesignMode(); }
});

// Change mode
game.enterDesignMode = function() {
  clear(game.imprint_ctx);
  ball.reset();
  game.mode = "design";
}
game.enterRunningMode = function() {
  clear(game.imprint_ctx);
  ball.reset();
  timer.start();
  ball.start();
  game.mode = "running";
}
game.endRunningMode = function() {
  ball.stop();
  timer.stop();
}
game.enterScoreMode = function() {
    this.score();
    game.mode = "score";
}


// Show the player the score
game.score = function() {
  // ...what is the point of this method.
}
