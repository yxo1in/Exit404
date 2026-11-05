import { BFS } from "./map.js";
// BFS

const teacher = {
  "idle-up": "mirim_teacher back.png",
  "idle-down": "mirim_teacher front.png",
  "idle-right": "mirim_teacher right_side.png",
  "idle-left": "mirim_teacher right_side.png",
  "walk-up": "mirim_teacher back_walking.gif",
  "walk-down": "mirim_teacher_front_walking.gif",
  "walk-right": "mirim_teacher right_side_walking.gif",
  "walk-left": "mirim_teacher right_side_walking.gif",
};
const moveTeacher = () => {
  console.log(BFS(10, 10));
  requestAnimationFrame(moveTeacher);
};
requestAnimationFrame(moveTeacher);

export { moveTeacher };
