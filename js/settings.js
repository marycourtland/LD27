var start_level = 3;

// Boolean options
var leave_ball_imprints = false;
var keep_tool_over_runs = true; // removed

// Dimensions
var level_text_height = 150;
var start_pos = xy(100, 300);
var end_pos = xy(700, 300);
var text_pad = 30;
var point_radius = 20;
var ball_radius = 15;
var ball_imprint_radius = 4;
var ball_start_velocity = xy(0, 0);
var ball_speed = 2;
var end_point_tolerance = 5;
var wall_size = xy(80, 5);
var wall_tolerance = 0;
var attractor_radius = 10;
var timer_pos = xy(670, 50);
var timer_size = xy(50, 30);
var timer_pad = xy(10, 5);

var swamp_speed_reduction = 0.28;
var grass_speed_boost = 2;

var default_font = {size: 16, type: 'Arial', italic: false};
var level_font = {size: 12, type: 'Arial', italic: true};
var huge_font = {size: 72, type: 'Arial', italic: false};

var goal_text = "Your goal: guide the ball to the other point, in as close to 10 seconds as possible!";
var instructions_text = "Press space to start a run, then use the arrow keys to guide the ball.";
var cancel_text = "Press space to cancel the run"

// Inputs
var inputs = {
  start_run: "SPACE",
  halt_run: "SPACE",
  enter_design_mode: "SPACE",
  next_level: "ENTER",
  rotate_wall_cw: "D",
  rotate_wall_ccw: "A",
}

// Colors
var colors = {
  blackish: "#0F0404",
  bg: "#FEE882",
  timer: "#B57F35",
  level_text: "#B57F35",
  point: "#CA7316",
  ball: "#442415",
  ball2: "#B57F35",
  ball_faded: "#A1864B",
  swamp: "#6B5B0E",
  grass: "#AFD04C",
}
