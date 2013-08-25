

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










