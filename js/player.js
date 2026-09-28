const SIZE = 48;
const SPEED = 4;

const character = {
  "idle-up": "mirim_student back.png",
  "idle-down": "mirim_student front.png",
  "idle-right": "mirim_student right_side.png",
  "idle-left": "mirim_student right_side.png",
  "walk-up": "mirim_student back_walking.gif",
  "walk-down": "mirim_student_front_walking.gif",
  "walk-right": "mirim_student right_side_walking.gif",
  "walk-left": "mirim_student right_side_walking.gif",
};

const player = document.getElementById("player");

let x = 100;
let y = 100;
let see = "down";
let pressed = {};

const setCharacter = (move) => {
  // 움직이고 있는데 같은 행동을 하면 그냥 그대로 유지
  if (player.dataset.sprite === move) return;
  player.dataset.sprite = move;
  player.src = encodeURI(`./assets/character/${character[move]}`);
};

const move = () => {
  const isLeft = see === "left" ? " scaleX(-1)" : "";
  player.style.transform = `translate(${x}px, ${y}px)${isLeft}`;
};

const loop = () => {
  let moved = false;

  if (pressed.ArrowUp) {
    y -= SPEED;
    see = "up";
    moved = true;
  } else if (pressed.ArrowDown) {
    y += SPEED;
    see = "down";
    moved = true;
  } else if (pressed.ArrowLeft) {
    x -= SPEED;
    see = "left";
    moved = true;
  } else if (pressed.ArrowRight) {
    x += SPEED;
    see = "right";
    moved = true;
  }

  x = Math.max(0, Math.min(x, window.innerWidth - SIZE));
  y = Math.max(0, Math.min(y, window.innerHeight - SIZE));

  setCharacter(moved ? `walk-${see}` : `idle-${see}`);
  move();

  requestAnimationFrame(loop);
};

const intersect = () => {
  console.log("d");
};

const playerIntersect = (key) => {
  pressed[key] = true;
  if (key === "KeyF") {
    intersect();
  }
};

const stop = (key) => {
  pressed[key] = false;
};

window.addEventListener("blur", () => {
  pressed = {};
});

setCharacter("idle-down");
move();
requestAnimationFrame(loop);

export { playerIntersect, stop };
