
// ========================================= LEVELS

game.levels = [];
game.current_level = start_level;
game.tickActions.push(function() { this.levels[this.current_level].tick(); });
game.finalActions.push(function() { this.levels[this.current_level].draw(); });
game.doNextLevel = function() {
  if (this.current_level < this.levels.length - 1) {
    this.levels[this.current_level].onleave();
    this.current_level += 1; 
    this.levels[this.current_level].onload();
  }
  else game.stage = game.titlescreen;
}

function makeLevel(id) {
  var lvl = {
    id: id,
    text: [],
    score_text: [],
    objects: [], // TODO: can't remember if i actually used this. check on that
    draw: function() {
      var txt = this.text;
      if (game.mode == 'running' || game.mode == 'score') txt = txt.concat([round(timer.getTime(), 2).toString()]);
      if (game.mode == 'score') txt = txt.concat(this.score_text());
      rect(game.ctx, xy(0, 0), xy(game.size.x, level_text_height), colors.level_text);
      game.setFont(level_font);
      text(game.ctx, "Level " + this.id.toString(), xy(10, 20), "nw");
      game.setFont(default_font);
      text(game.ctx, txt, xy(20, 40), "nw");
      game.setFont(default_font);
      this.draw_extras();
    },
    draw_extras: function() {},    onload: function() {
      for (var i = 0; i < this.loadActions.length; i++) {
        this.loadActions[i].call(this);
      }
    },
    onrun: function() {
      for (var i = 0; i < this.runActions.length; i++) {
        this.runActions[i].call(this);
      }
    },
    onload: function() {
      for (var i = 0; i < this.loadActions.length; i++) {
        this.loadActions[i].call(this);
      }
    },
    onleave: function() {
      for (var i = 0; i < this.leaveActions.length; i++) {
        this.leaveActions[i].call(this);
      }
    },
    tick: function() {
      for (var i = 0; i < this.tickActions.length; i++) {
        this.tickActions[i].call(this);
      }
    },
    runActions: [],
    loadActions: [],
    leaveActions: [],
    tickActions: [],
  };
  game.levels.push(lvl);
  lvl.loadActions.push(function() { motes.refresh(); }); // Create new motes at the beginning of each level
  lvl.leaveActions.push(function() { clear(game.bg_ctx); }); // Clean up the objects in the background
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


