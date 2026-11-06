import { BFS } from "./map.js";
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

const moveTeacher = () => {
  // console.log(BFS(10, 10));
  setCharacter(`idle-${see}`);
  draw();

  requestAnimationFrame(moveTeacher);
};
requestAnimationFrame(moveTeacher);

export { moveTeacher };
