import { BFS, toCell, toPixel } from "./map.js";
import { getPlayerPos } from "./player.js";
// BFS

const CHARACTER = {
  "idle-up": "mirim_teacher back.png",
  "idle-down": "mirim_teacher front.png",
  "idle-right": "mirim_teacher right_side.png",
  "idle-left": "mirim_teacher left_side.png",
  "walk-up": "mirim_teacher back_walking.gif",
  "walk-down": "mirim_teacher front_walking.gif",
  "walk-right": "mirim_teacher right_side_walking.gif",
  "walk-left": "mirim_teacher left_side_walking.gif",
};
const teacher = document.getElementById("teacher");

// 선생님 월드 좌표 (플레이어 x, y와 같은 픽셀 기준)
let tx = 600;
let ty = 500;
let see = "down";
let SPEED = 1;

const setCharacter = (move) => {
  if (teacher.dataset.sprite === move) return;
  teacher.dataset.sprite = move;
  teacher.src = encodeURI(`./assets/character/${CHARACTER[move]}`);
};

const draw = () => {
  const pos = getPlayerPos();
  const screenX = window.innerWidth / 2 + (tx - pos.x);
  const screenY = window.innerHeight / 2 + (ty - pos.y);

  teacher.style.position = "fixed";
  teacher.style.left = `${screenX}px`;
  teacher.style.top = `${screenY}px`;
  teacher.style.transform = "translate(-50%, -50%)";
  teacher.style.zIndex = 2;
};

let path = [];
let lastGoal = "";

const setPath = () => {
  const start = toCell(tx, ty);
  const res = BFS(start.col, start.row);
  if (res.length === 0) {
    // res => 경로인데 경로가 없는거면 캐릭터와 닿은거겠죠?
    // Game Over 구현하기 **
  }
  path = res;
};

const move = () => {
  const target = toPixel(path[0].row, path[0].col);
  const dx = target.x - tx;
  const dy = target.y - ty;

  tx = target.x;
  ty = target.y;
  path.shift();

  if (dx > dy) {
    tx += dx * SPEED
    see = dx > 0 ? "right" : "left";
  } else {
    ty += dx * SPEED
    see = dy > 0 ? "down" : "up";
  }
  return true;
};

const moveTeacher = () => {
  setPath();
  const isMove = move();
  setCharacter(isMove ? `walk-${see}` : `idle-${see}`);
  draw();

  requestAnimationFrame(moveTeacher);
};
requestAnimationFrame(moveTeacher);

export { moveTeacher };
