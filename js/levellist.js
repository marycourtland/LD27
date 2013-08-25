

// ================= LEVEL 1 ========================
var level1 = makeLevel(1);
level1.text = [
  "Get to the other place in exactly ten seconds. Ten point oh, on the dot!",
  "Use the arrow keys to move. Press space when you're ready."
],
level1.score_text = [" ... That could have been closer to 10. Press space to try again. Or, press enter to try the next level."];
level1.draw_extras = function() {
  game.setFont(huge_font);
  text(game.ctx, ["This is, in fact,", "the easiest level!"], xy(240, 380), "nw", colors.blackish);
  game.setFont(default_font);
}

// ================= LEVEL 2 ======================== Introduce swamp
var level2 = makeLevel(2);
level2.text = [
  "Better hurry up! It will take longer to get through the swamp!"
],
level2.score_text = [" ... That could have been closer to 10. Press space to try again. Or, press enter to try the next level."];
level2.draw_extras = function() {
}
var s = makeSwamp(level2, end_pos.copy(), 200);

// ================= LEVEL 3 ======================== Introduce grass
var level3 = makeLevel(3);
level3.text = [
  "Now take your time. It's easy to run through the grass."
],
level3.score_text = [" ... That could have been closer to 10. Press space to try again. Or, press enter to try the next level."];
level3.draw_extras = function() {
}
var g = makeGrass(level3, start_pos.copy(), 200);

// ================= LEVEL 4 ======================== Introduce wind
var level4 = makeLevel(4);
level4.text = [
  "Where will the wind take you?"
],
level4.score_text = [" ... That could have been closer to 10. Press space to try again. Or, press enter to try the next level."];
level4.draw_extras = function() {
}
var w = makeWind(level4, function(pos) { return xy(0, 1); } );

// ================= LEVEL 5 ======================== More interesting wind
var level5 = makeLevel(5);
level5.text = [
  "No need to rush!"
],
level5.score_text = [" ... That could have been closer to 10. Press space to try again. Or, press enter to try the next level."];
level5.draw_extras = function() {
}
w = makeWind(level5, function(pos) {
  return scale(subtract(end_point.pos, pos), 0.05);
});

// ================= LEVEL 6 ======================== Circular wind around grass
var level6 = makeLevel(6);
level6.text = [
  "Round and round"
],
level6.score_text = [" ... That could have been closer to 10. Press space to try again. Or, press enter to try the next level."];
level6.draw_extras = function() {
}
level6.center = scale(game.size, 0.5).yshift(level_text_height/2)
level6.strength = 2;
w = makeWind(level6, function(pos) {
  var p = this.level.center;
  var th = subtract(pos, p).th - Math.PI/2; // This is CCW. For CW, add pi/2 instead
  var v = rth(this.level.strength, th);
  return v;
});

// ================= LEVEL 7 ======================== EARTHQUAKE.
var level7 = makeLevel(7);
level7.text = [
  "Carry on, nothing to see here."
],
level7.score_text = [" ... Eeek! Yes, it's hard to be on time when catastrophes happen! Maybe you'll have better luck if you try again."];
level7.draw_extras = function() {
  if (!this.earthquake) return;
  game.setFont(huge_font);
  text(game.ctx, ["EARTHQUAKE!"], xy(80, 380), "nw", colors.blackish);
  game.setFont(default_font);
  
}
level7.earthquake = false;
level7.shockwave = null;
level7.runActions.push(function() {
  var earthquake_time = 5 + Math.random() * 3;
  console.log("earthquake time: ", earthquake_time);
  // Set timeout for earthquake
  setTimeout(function() {
      level7.earthquake = true;
      level7.shockwave = generateShockwave(game.state.frame, level7);
    }, earthquake_time*1000);
});
level7.leaveActions.push(function() { this.earthquake = false; });

w = makeWind(level7, function(pos) {
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


// ================= LEVEL 8 ======================== 
var level8 = makeLevel(8);
level8.text = [
  "Be there, or be square."
],
level8.score_text = [" ... That could have been closer to 10. Press space to try again. Or, press enter to try the next level."];
level8.draw_extras = function() {
}
level8.center = scale(game.size, 0.5).yshift(level_text_height/2)
level8.strength = 2;
w = makeWind(level8, function(pos) {
  return xy(this.level.strength * Math.sin(pos.y/100), this.level.strength * Math.sin(pos.x/100));
});






