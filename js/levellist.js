

// ================= LEVEL 1 ========================
var level1 = makeLevel(1);
level1.text = [
  "Remember, you need to get the other place in exactly ten seconds. Ten point oh, on the dot!",
  "Use the arrow keys to move. Press space when you're ready."
],
level1.score_text = function() { return [" ... " + getScoreText() + "Or, press enter to try the next level."]; }
level1.draw_extras = function() {
  if (game.mode != 'score') return;
  game.setFont(huge_font);
  text(game.ctx, ["(this is, in fact,", "the easiest level!)"], xy(220, 380), "nw", colors.blackish);
  game.setFont(default_font);
}

// ================= LEVEL 2 ======================== Introduce swamp
var level2 = makeLevel(2);
level2.text = [
  "Better hurry up! It will take longer to get through the swamp!",
  "(Also, ignore the flies.)",
],
level2.score_text = function() { return [" ... " + getScoreText() + "Or, press enter to try the next level."]; }
level2.draw_extras = function() {
}
makeSwamp(level2, end_pos.copy(), 150);

// ================= LEVEL 3 ======================== Introduce grass
var level3 = makeLevel(3);
level3.text = [
  "Now take your time. It's easy to go fast on the grass."
],
level3.score_text = function() { return [" ... " + getScoreText() + "Or, press enter to try the next level."]; }
level3.draw_extras = function() {
}
 makeGrass(level3, start_pos.copy(), 150);

// ================= LEVEL 4 ======================== Swamp / grass maze
var level4 = makeLevel(4);
level4.text = [
  "Which path will you take?"
],
level4.score_text = function() { return [" ... " + getScoreText() + "Or, press enter to try the next level."]; }
level4.draw_extras = function() {
}
var v = rth(200, radians(60));
var v2 = rth(200, radians(0));

makeGrass(level4, start_pos.copy(), 100);

makeSwamp(level4, add(start_pos, v2), 100);
makeSwamp(level4, add(add(start_pos, v2), v2), 100);
makeGrass(level4, add(add(add(start_pos, v2), v2), v2), 100);

makeGrass(level4, add(start_pos, neg(v)), 100);
makeSwamp(level4, add(add(start_pos, neg(v)), v2), 100);
makeGrass(level4, add(add(add(start_pos, neg(v)), v2), v2), 100);
makeGrass(level4, add(add(add(add(start_pos, neg(v)), v2), v2), v2), 100);
makeGrass(level4, add(add(add(add(add(start_pos, neg(v)), v2), v2), v2), v2), 100);

makeSwamp(level4, add(start_pos, v), 100);
makeGrass(level4, add(add(start_pos, v), neg(v2)), 100);
makeGrass(level4, add(add(add(start_pos, v), neg(v2)), v), 100);
makeGrass(level4, add(add(start_pos, v), v2), 100);
makeSwamp(level4, add(add(add(start_pos, v), v2), v2), 100);
makeGrass(level4, add(add(add(add(start_pos, v), v2), v2), v2), 100);

makeSwamp(level4, add(add(add(add(start_pos, v), neg(v2)), v2), v), 100);
makeGrass(level4, add(add(add(add(add(start_pos, v), neg(v2)), v2), v2), v), 100);
makeGrass(level4, add(add(add(add(add(add(start_pos, v), neg(v2)), v2), v2), v2), v), 100);


// ================= LEVEL 5 ======================== Introduce wind
var level5 = makeLevel(5);
level5.text = [
  "You've grown wings! No more must you wade through swamp and grass.",
  "But where will the wind take you?"
],
level5.score_text = function() { return [" ... " + getScoreText() + "Or, press enter to try the next level."]; }
level5.draw_extras = function() {
}
var w = makeWind(level5, function(pos) { return xy(0, 1); } );

// ================= LEVEL 6 ======================== More interesting wind
var level6 = makeLevel(6);
level6.text = [
  "No need to rush!"
],
level6.score_text = function() { return [" ... " + getScoreText() + "Or, press enter to try the next level."]; }
level6.draw_extras = function() {
}
w = makeWind(level6, function(pos) {
  return scale(subtract(end_point.pos, pos), 0.05);
});

// ================= LEVEL 7 ======================== Circular wind around grass
var level7 = makeLevel(7);
level7.text = [
  "Round and round."
],
level7.score_text = function() { return [" ... " + getScoreText() + "Or, press enter to try the next level."]; }
level7.draw_extras = function() {
}
level7.center = scale(game.size, 0.5).yshift(level_text_height/2)
level7.strength = 2;
w = makeWind(level7, function(pos) {
  var th = subtract(pos, this.level.center).th - Math.PI/2; // This is CCW. For CW, add pi/2 instead
  var v = rth(this.level.strength, th);
  return v;
});

// ================= LEVEL 8 ======================== EARTHQUAKE.
var level8 = makeLevel(8);
level8.text = [
  "Carry on, nothing to see here."
],
level8.score_text = function() { return [" ... Eeek! Yes, it's hard to be on time when catastrophes happen! Maybe you'll have better luck if you try again."]; }
level8.draw_extras = function() {
  if (!this.earthquake) return;
  game.setFont(huge_font);
  text(game.ctx, ["EARTHQUAKE!"], xy(80, 380), "nw", colors.blackish);
  game.setFont(default_font);
  
}
level8.earthquake = false;
level8.shockwave = null;
level8.runActions.push(function() {
  var earthquake_time = 5 + Math.random() * 3;
  console.log("earthquake time: ", earthquake_time);
  // Set timeout for earthquake
  setTimeout(function() {
      level8.earthquake = true;
      level8.shockwave = generateShockwave(game.state.frame, level8);
    }, earthquake_time*1000);
});
level8.leaveActions.push(function() { this.earthquake = false; });

w = makeWind(level8, function(pos) {
  if (!this.level.earthquake) return xy(0, 0);
  return this.level.shockwave.getFromFrame(game.state.frame);
});

function generateShockwave(start_frame, level) {
  return {
    level: level,
    f0: start_frame,
    F: Math.floor(Math.random() * 5) + 20,
    df: Math.floor(Math.random() * 5),
    getFromFrame: function(frame) {
      // First shockwave
      if (frame - this.f0 < this.F) return randXY(xy(10, 0));
      if (frame - this.f0 < this.F + this.df) return xy(0, -10);
      if (frame - this.f0 < this.F + 2*this.df) return xy(0, 6);
      if (frame - this.f0 < this.F + 3*this.df) return xy(0, -8);
      if (frame - this.f0 < this.F + 4*this.df) return xy(0, 2);
      
      // Second shockwave
      if (frame - this.f0 < 3*this.F) return randXY(xy(-10, 0));
      if (frame - this.f0 < 3*this.F + this.df) return xy(0, -2);
      if (frame - this.f0 < 3*this.F + 2*this.df) return xy(0, 2);
      if (frame - this.f0 < 3*this.F + 3*this.df) return xy(0, -2);
      if (frame - this.f0 < 3*this.F + 4*this.df) return xy(0, 2);
      
      // Third shockwave
      if (frame - this.f0 < 6*this.F) return randXY(xy(10, 0));
      if (frame - this.f0 < 6*this.F + this.df) return xy(0, 10);
      if (frame - this.f0 < 6*this.F + 2*this.df) return xy(0, -6);
      if (frame - this.f0 < 6*this.F + 3*this.df) return xy(0, 8);
      if (frame - this.f0 < 6*this.F + 4*this.df) return xy(0, -0.5);
      
      this.level.earthquake = false;
      return xy(0, 0);
    }
  }
}


// ================= LEVEL 9 ======================== Saddle point
var level9 = makeLevel(9);
level9.text = [
  "Be there, or be square."
],
level9.score_text = function() { return [" ... " + getScoreText() + "Or, press enter to try the next level."]; }
level9.draw_extras = function() {
}
level9.strength = 2;
w = makeWind(level9, function(pos) {
  return xy(this.level.strength * Math.sin(pos.y/100), this.level.strength * Math.sin(pos.x/100));
});


// ================= LEVEL 10 ======================== Vortex maze
var level10 = makeLevel("10");
level10.text = [
  "Watch your step - this is the final level!"
],
level10.score_text = function() { return [" ... " + getScoreText() + "Or, press enter to return to the beginning."]; }
level10.draw_extras = function() {
}
level10.center = scale(game.size, 0.5).yshift(level_text_height/2)
level10.vortices = [
  [xy(100, 200), 1],
  [xy(100, 400), -1],
  [xy(250, 250), 1],
  [xy(200, 500), -1],
  [xy(370, 370), -1],
  [xy(550, 300), -1],
  [xy(640, 480), 1],
  [xy(720, 180), 1],
]
for (var i = 0; i < level10.vortices.length; i++) {
  var w = makeWind(level10, function(pos) {
    var pos2 = subtract(pos, this.center);
    var scale = 200;
    return xy(
      this.dir * scale * pos2.y / (pos2.r * pos2.r),
      -this.dir * scale * pos2.x / (pos2.r * pos2.r)
    )
  });
  w.center = level10.vortices[i][0];
  w.dir = level10.vortices[i][1];
}



