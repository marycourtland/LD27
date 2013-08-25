
// ========================================= LEVELS

game.levels = [];
game.current_level = start_level;
game.finalActions.push(function() { this.levels[this.current_level].draw(); });
game.doNextLevel = function() {
  if (this.current_level < this.levels.length - 1) this.current_level += 1; 
}

function makeLevel(id) {
  var lvl = {
    id: id,
    text: [],
    score_text: [],
    draw: function() {
      var txt = this.text;
      if (game.mode == 'running' || game.mode == 'score') txt = txt.concat([round(timer.getTime(), 2).toString()]);
      if (game.mode == 'score') txt = txt.concat(this.score_text);
      rect(game.ctx, xy(0, 0), xy(game.size.x, level_text_height), colors.level_text);
      game.setFont(level_font);
      text(game.ctx, "Level " + this.id.toString(), xy(10, 20), "nw");
      game.setFont(default_font);
      text(game.ctx, txt, xy(20, 40), "nw");
      game.setFont(default_font);
      this.draw_extras();
    },
    draw_extras: function() {},
    objects: []
  };
  game.levels.push(lvl);
  return lvl;
}
function makeLevelObject(parent_level) {
  var obj = new GameObject(game);
  obj.level = parent_level;
  obj._tick = obj.tick;
  obj._draw = obj.draw;
  obj.tick = function() { if (game.levels[game.current_level].id != this.level.id) return; this._tick(); }
  obj.draw = function() { if (game.levels[game.current_level].id != this.level.id) return; this._draw(); }
  return obj;
}

// ----------------- Level 1 ------------------------
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

// ----------------- Level 2 ------------------------
var level2 = makeLevel(2);
level2.text = [
  "Better hurry up! It will take longer to get through the swamp!"
],
level2.score_text = [" ... That could have been closer to 10. Press space to try again. Or, press enter to try the next level."];
level2.draw_extras = function() {
  game.setFont(huge_font);
  //text(game.ctx, ["This is, in fact,", "the easiest level!"], xy(240, 380), "nw", colors.blackish);
  game.setFont(default_font);      
}

makeSwamp(level2, end_pos.copy(), 200);
