
// ========================================= The game (On the Dot)
var game = new Game({bg_color: colors.bg});
game.setTitle("On The Dot.");
game.setSize(xy(800, 600));
game.setFont(default_font);
window.onload = function() {
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
  this.levels[this.current_level].onrun();
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

var arrow = loadImage(this.ctx, "images/arrow.png");

// Title screen
game.titlescreen = function() {
  clear(this.ctx);
  var old_font = this.display.font;
  this.setFont({size: 72, type: 'Arial'});
  text(this.ctx, this.title, scale(game.size, 0.5).yshift(-200), "centered");
  this.setFont({size: 24, type: 'Arial'});
  text(this.ctx, "Travel from point A to point B in exactly 10 seconds.", scale(game.size, 0.5).yshift(60), "centered");
  this.setFont({size: 36, type: 'Arial', italic:true});
  text(this.ctx, "Click to start." , scale(game.size, 0.5).yshift(120), "centered");
  
  this.setFont({size: 16, type: 'Arial', italic:false});
  text(this.ctx, "Game created for Ludum Dare 27!" , scale(game.size, 0.5).yshift(260), "centered");
  this.setFont(old_font);
  
  draw_bullet(this.ctx, xy(200, 250), 60, colors.point);
  draw_bullet(this.ctx, xy(600, 250), 60, colors.point);
  this.ctx.drawImage(arrow, game.size.x/2 - arrow.width/2, 250 - arrow.height/2);
}

game.stage = game.titlescreen;

game.ctx.canvas.addEventListener("click", function(event) {
  if (game.stage == game.titlescreen) {
    game.stage = game.gameplay;
    game.next();
  }
})

draw_bullet = function(ctx, pos, size, color) {
  ctx.save();
  ctx.globalAlpha = 1;
  circle(ctx, pos, size, colors.point);
  ctx.lineWidth = size/20;
  emptyCircle(ctx, pos, size - 5 * size/20, color);
  emptyCircle(ctx, pos, size - 10 * size/20, color);
  emptyCircle(ctx, pos, size - 15 * size/20, color);
  ctx.restore();
}

scoretexts = {
  2: "That could have been closer to 10. Press space to try again. ",
  1: "Not too bad, but do you want to try to get closer? If so, press space. ",
  0.1: "Well done! (But not perfect yet.) Press space to try again. ",
  0.0: "Perfection has been attained! Press space to attain it again. ",
}

function getScoreText() {
  var t = round(Math.abs(10 - timer.result), 1);
  if (t > 2) return scoretexts[2];
  else if (t > 1) return scoretexts[1];
  else if (t > 0.1) return scoretexts[0.1];
  else return scoretexts[0];
}

