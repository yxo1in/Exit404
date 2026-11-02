// 맵 칸 표: 0 = 바닥, 1 = 벽, 다른 숫자는 아이템??
import { rooms, walls, corridors } from "./map.js";

const gridMinX = 6; // 방, 복도, 벽으 ㅣ가장 작은 x값 => 레전드 하드코딩
const gridMinY = -1; // 얘도 똑같
const COLS = 77; // 가로 칸 수 => 가장 오른쪽에 잇는거(w_right_top2) - gridMinX
const ROWS = 54; // 세로 칸 수 => 가장 아래 잇는거

const grid = Array.from({ length: ROWS }, () => Array(COLS).fill(1));


rooms.map((r) => {
  for (let row = r.y - gridMinY; row < r.y - gridMinY + r.h; row++) {
    for (let col = r.x - gridMinX; col < r.x - gridMinX + r.w; col++) {
      grid[row][col] = 0;
    }
  }
});
corridors.map((r) => {
    for (let row = r.y - gridMinY; row < r.y - gridMinY + r.h; row++) {
      for (let col = r.x - gridMinX; col < r.x - gridMinX + r.w; col++) {
        grid[row][col] = 0;
      }
    }
});


export { grid, gridMinX, gridMinY };
