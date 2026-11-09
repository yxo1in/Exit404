import { BFS, toCell } from "./map.js";
import {
  getPlayerPos,
  isOpenInventory,
  isOpenQuestionModal,
} from "./player.js";
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

const setPath = () => {
  const pos = getPlayerPos();
  const goal = toCell(pos.x, pos.y);
  if (goal.col === pos.x && goal.row === pos.y && path.length) return;

  const start = toCell(tx, ty);
  const res = BFS(start.col, start.row);
  if (!res) {
    // setGoal이 실행되기 전
    path = [];
    return;
  }
  if (res.length === 0) {
    // res => 경로인데 경로가 없는거면 캐릭터와 닿은거겠죠?
    // Game Over 구현하기 **
    console.log("game over");
  }
  path = res;
};

const move = () => {
  if (!path.length) return false;

  const current = toCell(tx, ty); // 지금 선생님이 있는 칸
  if (current.row === path[0].row && current.col === path[0].col) {
    path.shift(); // 다음 칸에 들어왔으면 그 다음 칸으로
    if (!path.length) return false;
  }

  const next = path[0];
  if (next.col > current.col) {
    tx += SPEED;
    see = "right";
  } else if (next.col < current.col) {
    tx -= SPEED;
    see = "left";
  } else if (next.row > current.row) {
    ty += SPEED;
    see = "down";
  } else {
    ty -= SPEED;
    see = "up";
  }
  return true;
};

const moveTeacher = () => {
  if (!isOpenInventory && !isOpenQuestionModal) {
    setPath();
    const isMove = move();
    setCharacter(isMove ? `walk-${see}` : `idle-${see}`);
    draw();
  }
  requestAnimationFrame(moveTeacher);
};

export { moveTeacher };
