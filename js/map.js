import { getPlayerPos } from "./player.js";

const TILE_SIZE = 40;

const rooms = [
  // 왼쪽 라인
  { name: "r_left_top", x: 6, y: 6, w: 11, h: 10 },
  { name: "r_left_bot", x: 6, y: 28, w: 13, h: 20 },

  // 중앙 상단 라인
  { name: "r_top_1", x: 21, y: 3, w: 7, h: 5 },
  { name: "r_top_2", x: 31, y: 3, w: 7, h: 5 },
  { name: "r_top_3", x: 45, y: 3, w: 9, h: 5 },

  // 중앙
  { name: "r_mid_center", x: 22, y: 20, w: 13, h: 13 },
  { name: "r_mid_center_sub", x: 33, y: 20, w: 6, h: 7 },
  { name: "r_mid_small", x: 47, y: 20, w: 6, h: 8 },

  // 오른쪽 상단
  { name: "r_right_top1", x: 57, y: 5, w: 9, h: 17 },
  { name: "r_right_top1_sub", x: 56, y: 17, w: 12, h: 6 },
  { name: "r_right_top2", x: 70, y: 5, w: 13, h: 18 },

  // 오른쪽 중앙
  { name: "r_right_mid", x: 56, y: 27, w: 11, h: 6 },
  { name: "r_right_bot1", x: 70, y: 27, w: 9, h: 5 },

  // 하단 라인
  { name: "r_bot_mid", x: 27, y: 47, w: 17, h: 6 },
  { name: "r_bot_right", x: 60, y: 44, w: 22, h: 8 },
];

const walls = [
  // 1. 기존 방 상단 회색 벽 (h: 4로 통일)
  { name: "w_left_top", x: 6, y: 2, w: 11, h: 4 },
  { name: "w_left_bot", x: 6, y: 24, w: 13, h: 4 },

  { name: "w_top_1", x: 21, y: -1, w: 7, h: 4 },
  { name: "w_top_2", x: 31, y: -1, w: 7, h: 4 },
  { name: "w_top_3", x: 45, y: -1, w: 9, h: 4 },

  { name: "w_mid_center", x: 22, y: 16, w: 13, h: 4 },
  { name: "w_mid_center_sub", x: 33, y: 16, w: 6, h: 4 },
  { name: "w_mid_small", x: 47, y: 16, w: 6, h: 4 },

  { name: "w_right_top1", x: 57, y: 1, w: 9, h: 4 },
  { name: "w_right_top2", x: 70, y: 1, w: 13, h: 4 },

  { name: "w_right_mid", x: 56, y: 23, w: 11, h: 4 },
  { name: "w_right_bot1", x: 70, y: 23, w: 9, h: 4 },

  // 2. 상단 메인 복도(c_top_main, y:12) 위쪽 연결 벽 (y: 8, h: 4)
  { name: "w_top_corridor_link1", x: 17, y: 8, w: 6, h: 4 },
  { name: "w_top_corridor_link2", x: 25, y: 8, w: 9, h: 4 },
  { name: "w_top_corridor_link3", x: 36, y: 8, w: 5, h: 4 },
  { name: "w_top_corridor_link4", x: 50, y: 8, w: 7, h: 4 },
  { name: "w_top_corridor_link4", x: 45, y: 8, w: 3, h: 4 },
  { name: "w_top_top_corridor_link", x: 41, y: 6, w: 4, h: 4 },
  { name: "w_bot_corridor_link", x: 68, y: 15, w: 2, h: 4 },
  { name: "w_bot_corridor_link", x: 66, y: 13, w: 2, h: 4 },

  // 3. 하단 메인 복도(c_bot_main, y:37) 위쪽 연결 벽 (y: 33, h: 4)
  { name: "w_bot_corridor_link1", x: 19, y: 33, w: 6, h: 4 },
  { name: "w_bot_corridor_link2", x: 29, y: 33, w: 8, h: 4 },
  { name: "w_bot_corridor_link3", x: 37, y: 28, w: 4, h: 4 },
  { name: "w_bot_corridor_link3", x: 45, y: 33, w: 3, h: 4 },
  { name: "w_bot_corridor_link3", x: 48, y: 29, w: 7, h: 4 },
  { name: "w_bot_corridor_link3", x: 55, y: 33, w: 3, h: 4 },
  { name: "w_bot_corridor_link3", x: 60, y: 33, w: 13, h: 4 },
  { name: "w_bot_corridor_link4", x: 75, y: 33, w: 8, h: 4 },

  // 4. 하단 라인 방 상단 회색 벽 (h: 4)
  { name: "w_bot_mid", x: 27, y: 43, w: 17, h: 4 },
  { name: "w_bot_right", x: 60, y: 40, w: 22, h: 4 },
];

const corridors = [
  // 1. 상단 메인 가로 복도 (왼쪽 라인부터 중앙 상단 방들을 이어주는 복도)
  { name: "c_top_main", x: 17, y: 12, w: 40, h: 3 },

  // 2. 하단 메인 가로 복도 (좌측 하단부터 우측 하단까지 전체를 관통하는 길)
  { name: "c_bot_main", x: 19, y: 37, w: 64, h: 4 },

  // 3. 중앙 메인 세로 복도 (상단 복도와 하단 복도를 잇는 큰 기둥 복도)
  { name: "c_mid_vertical", x: 41, y: 10, w: 4, h: 30 },

  // 4. 왼쪽 세로 연결 복도 (왼쪽 위 방/아래 방에서 복도로 들어오는 입구)
  { name: "c_left_top_link", x: 25, y: 13, w: 4, h: 7 },
  { name: "c_left_bot_link", x: 25, y: 33, w: 4, h: 4 },

  // 제일 작은 방
  { name: "c_mid_small_link", x: 49, y: 13, w: 2, h: 7 },
  //상단 작은 방
  { name: "c_right_top_link", x: 48, y: 8, w: 2, h: 5 },
  { name: "c_right_top_link", x: 34, y: 8, w: 2, h: 5 },
  { name: "c_right_top_link", x: 23, y: 8, w: 2, h: 5 },
  // 맨 왼쪽 큰방 두개 연결
  { name: "c_right_mid_link", x: 68, y: 19, w: 2, h: 3 },

  // 6. 하단
  //방 이어주기
  { name: "r_bot_left_top_link", x: 30, y: 41, w: 3, h: 6 },
  { name: "r_bot_left_bot_link", x: 58, y: 33, w: 2, h: 5 },
  { name: "l_bot_center_link", x: 73, y: 32, w: 2, h: 6 },
  { name: "l_bot_right_link", x: 69, y: 40, w: 4, h: 4 },

  //방
  { name: "c_bot_center_pocket", x: 37, y: 32, w: 8, h: 11 },
  { name: "c_bot_right_pocket", x: 48, y: 33, w: 7, h: 10 },
];

const thickness = [];

const roadMap = () => {
  const canvas = document.getElementById("mapCanvas");
  const ctx = canvas.getContext("2d");

  const corridorTile = new Image();
  corridorTile.src = "../assets/tile/corridor-tile.png";
  const toiletTile = new Image();
  toiletTile.src = "../assets/tile/toilet-tile.jpeg";
  const woodTile = new Image();
  woodTile.src = "../assets/tile/wood-tile.png";

  let imagesLoaded = 0;
  const onImageLoad = () => {
    imagesLoaded++;
    if (imagesLoaded === 3) {
      resizeCanvas();
    }
  };

  corridorTile.onload = onImageLoad;
  toiletTile.onload = onImageLoad;
  woodTile.onload = onImageLoad;

  const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    draw();
  };

  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // ★ [카메라 추적 추가] 1. 플레이어 위치 및 카메라 Offset 계산
    const pos = getPlayerPos();
    const cameraX = canvas.width / 2 - pos.x;
    const cameraY = canvas.height / 2 - pos.y;

    // ★ [카메라 추적 추가] 2. 카메라 이동 적용
    ctx.save();
    ctx.translate(cameraX, cameraY);

    // ctx.fillStyle = '#000000'; // 검정색 지정
    // ctx.fillRect(0, 0, canvas.width, canvas.height); // 캔버스 전체 영역 칠하기

    const BORDER_SIZE = 8;
    ctx.fillStyle = "#84818a";

    corridors.forEach((corridor) => {
      ctx.fillRect(
        corridor.x * TILE_SIZE - BORDER_SIZE,
        corridor.y * TILE_SIZE - BORDER_SIZE,
        corridor.w * TILE_SIZE + BORDER_SIZE * 2,
        corridor.h * TILE_SIZE + BORDER_SIZE * 2,
      );
    });

    walls.forEach((wall) => {
      ctx.fillRect(
        wall.x * TILE_SIZE - BORDER_SIZE,
        wall.y * TILE_SIZE - BORDER_SIZE,
        wall.w * TILE_SIZE + BORDER_SIZE * 2,
        wall.h * TILE_SIZE + BORDER_SIZE * 2,
      );
    });

    rooms.forEach((room) => {
      ctx.fillRect(
        room.x * TILE_SIZE - BORDER_SIZE,
        room.y * TILE_SIZE - BORDER_SIZE,
        room.w * TILE_SIZE + BORDER_SIZE * 2,
        room.h * TILE_SIZE + BORDER_SIZE * 2,
      );
    });

    ctx.fillStyle = "rgb(88, 68, 68)";

    walls.forEach((wall) => {
      const WdrawX = wall.x * TILE_SIZE;
      const WdrawY = wall.y * TILE_SIZE;
      const WdrawWidth = wall.w * TILE_SIZE;
      const WdrawHeight = wall.h * TILE_SIZE;

      ctx.fillRect(WdrawX, WdrawY, WdrawWidth, WdrawHeight);
    });

    const corridorPattern = ctx.createPattern(corridorTile, "repeat");
    const Cmatrix = new DOMMatrix();
    Cmatrix.scaleSelf(0.2, 0.2);

    // 1. 매트릭스를 패턴에 적용
    corridorPattern.setTransform(Cmatrix);

    // 2. 캔버스 fillStyle에 패턴 지정
    ctx.fillStyle = corridorPattern;

    corridors.forEach((corridor) => {
      const CdrawX = corridor.x * TILE_SIZE;
      const CdrawY = corridor.y * TILE_SIZE;
      const CdrawWidth = corridor.w * TILE_SIZE;
      const CdrawHeight = corridor.h * TILE_SIZE;

      ctx.fillRect(CdrawX, CdrawY, CdrawWidth, CdrawHeight);
    });

    const woodPattern = ctx.createPattern(woodTile, "repeat");
    const matrix = new DOMMatrix();
    matrix.scaleSelf(0.3, 0.3);

    // 1. 매트릭스를 패턴에 적용
    woodPattern.setTransform(matrix);

    // 2. 캔버스 fillStyle에 패턴 지정
    ctx.fillStyle = woodPattern;

    rooms.forEach((room) => {
      const drawX = room.x * TILE_SIZE;
      const drawY = room.y * TILE_SIZE;
      const drawWidth = room.w * TILE_SIZE;
      const drawHeight = room.h * TILE_SIZE;

      ctx.fillRect(drawX, drawY, drawWidth, drawHeight);
    });

    // ★ [카메라 추적 추가] 3. 카메라 이동 복원
    ctx.restore();

    requestAnimationFrame(draw);
  };

  window.addEventListener("resize", resizeCanvas);
};

// 맵 칸 표: 0 = 바닥, 1 = 벽, 다른 숫자는 아이템??
const gridMinX = 6; // 방, 복도, 벽으 ㅣ가장 작은 x값ㅅ
const gridMinY = -1; // 얘도 똑같
const COLS = 77+7; // 가로 칸 수 => 가장 오른쪽에 잇는거(w_right_top2) - gridMinX
const ROWS = 54; // 세로 칸 수 => 가장 아래 잇는거

const grid = Array.from({ length: ROWS }, () => Array(COLS).fill(1));

rooms.map((r) => {
  for (let row = r.y - gridMinY; row < r.y - gridMinY + r.h; row++) {
    for (let col = r.x - gridMinX; col < r.x - gridMinX + r.w; col++) {
      grid[row][col+7] = 0;
    }
  }
});
corridors.map((r) => {
  for (let row = r.y - gridMinY; row < r.y - gridMinY + r.h; row++) {
    for (let col = r.x - gridMinX; col < r.x - gridMinX + r.w; col++) {
      grid[row][col+7] = 0;
    }
  }
});
grid.shift();
/*
1. 인덱스 + minValue => 좌표값으로 계산
2. 만약 SPEED 만큼 움직였는데 1으로 된 값의 위치하면 이동 불가
 => 이걸 어케 구할거냐? 캐릭터의 좌표값을 찾는 방법을 알아야함. 
	=> 이걸 토대로 배열에 넣어서 구해야하는데.......
	=> minValue - 캐릭터 좌표값 하면 인덱스 구해질듯.!!!!
3. 에러 발생 => 벽이 아닌데 막힘, 벽인데 안막힘 => 배열 인덱스를 잘못 가져온듯....
4. 해결!!!!!!!!!!!!!!!!!!
*/
const isMove = (x, y) => {
    // console.log(grid);
  // console.log(x, y);
  let cx = Math.ceil((x - gridMinX) / TILE_SIZE);
  let cy = Math.ceil((y - gridMinY) / TILE_SIZE);
  // console.log(cx, cy);
  // console.log(grid[cy][cx]);
  if (grid[cy][cx] === 0) {
    console.log(true);
    return true;
  }
  console.log(false);
  return false;
};

/* 
  BFS 구현하기
  1. queue 하나 만들기
  2. 시작 정점 = 선생님 좌표값
  3. 시작 정점의 adjacent => 해당 좌표의 한 칸 떨어진 좌표 => dx, dy로 구현 + 정점의 값이 0이여야함
  4. 근데 또 그렇게 하면 방문한 정점을 재방문하는 경우가 생길 수 있다 => 방문햇는지 체크 
  5. 이렇게 가다가 캐릭터 좌표값을 만나면 경로를 계산 => prev 이용 => prev => 현재 좌표의 전 칸을 담는 배열(grid와 같은 크기)
    => 1) prev에 넣는 값의 형식은 객체로, {row : , col : } 로 정의한다.
       2) prev에 처음 값을 넣을 땐 어디서 어디로 이동했는지 알 수 없음 => 해당 좌표값 넣기.
  
  prev 흐름
  0. 현재 좌표(선생님 좌표)와 캐릭터의 좌표가 같으면 GAME OVER => prev 실행 X
  1. 우선 prev를 만들 때 grid와 같은 크기로 만든 뒤 값을 null로 채운다.
  2. 큐에 넣는 순간 prev에 dequeue한 값을 넣는다.
  3. 조건 = 범위 안인가? + 해당 grid 값이 0인가? 해당 prev의 값이 null인지를 만족하면 큐에 enqueue
  4. BFS를 호출할 때마다 prev는 초기화
  5. 역추적 끝내는 조건 => prev[지금 row, 지금 col] == 선생님 칸
  6. prev로 최종 다착 지점을 가르키는 지점을 가리키는 지점을 ... 반복해서 경로 찾기

  => 총 반복문 2개 (BFS, prev)
*/ 


roadMap();
export { roadMap, rooms, walls, corridors, grid, gridMinX, gridMinY, isMove };
