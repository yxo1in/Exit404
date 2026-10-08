const TILE_SIZE = 16;
const WALL_THICKNESS = 32;
const CORRIDOR_TILE = 32;

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
    { name: "r_bot_right", x: 60, y: 44, w: 22, h: 8 }
];

const walls = [
    // 왼쪽 라인 
    { name: "r_left_top", x: 6, y: 2, w: 11, h: 4 },
    { name: "r_left_bot", x: 6, y: 24, w: 13, h: 4 },

    // 중앙 상단 라인 
    { name: "r_top_1", x: 21, y: -1, w: 7, h: 4 },
    { name: "r_top_2", x: 31, y: -1, w: 7, h: 4 },
    { name: "r_top_3", x: 45, y: -1, w: 9, h: 4 },

    // 중앙 
    { name: "r_mid_center", x: 22, y: 16, w: 13, h: 4 },
    { name: "r_mid_center_sub", x: 33, y: 16, w: 6, h: 4 },
    { name: "r_mid_small", x: 47, y: 16, w: 6, h: 4 },

    // 오른쪽 상단 
    { name: "r_right_top1", x: 57, y: 1, w: 9, h: 4 },
    //{ name: "r_right_top1_sub", x: 56, y: 13, w: 12, h: 4 },
    { name: "r_right_top2", x: 70, y: 1, w: 13, h: 4 },

    // 오른쪽 중앙 
    { name: "r_right_mid", x: 56, y: 24, w: 11, h: 4 },
    { name: "r_right_bot1", x: 70, y: 24, w: 9, h: 4 },

    // 하단 라인 
    { name: "r_bot_mid", x: 27, y: 43, w: 17, h: 4 },
    { name: "r_bot_right", x: 60, y: 40, w: 22, h: 4 }
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
    { name: "c_bot_right_pocket", x: 48, y: 33, w: 7, h: 10 }
];

const roadMap = () => {
    const canvas = document.getElementById("mapCanvas");
    const ctx = canvas.getContext("2d");

    const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // 크기가 변경되면 맵을 다시 그려줍니다.
        draw();
    };

    const draw = () => {
        // ctx.fillStyle = '#000000';
        // ctx.fillRect(0, 0, canvas.width, canvas.height);

        const corridorTile = new Image();
        corridorTile.src = "../assets/tile/corridor-tile.svg";
        const toiletTile = new Image();
        toiletTile.src = "../assets/tile/toilet-tile.jpeg";
        const woodTile = new Image();
        woodTile.src = "../assets/tile/wood-tile.png";


        rooms.forEach(room => {
            // 좌표 및 크기 계산
            const drawX = room.x * TILE_SIZE;
            const drawY = room.y * TILE_SIZE;
            const drawWidth = room.w * TILE_SIZE;
            const drawHeight = room.h * TILE_SIZE;

            // 갈색으로 채우기
            ctx.fillStyle = '#5C3A21';
            ctx.fillRect(drawX, drawY, drawWidth, drawHeight);

        });

        walls.forEach(wall => {

            const WdrawX = wall.x * TILE_SIZE;
            const WdrawY = wall.y * TILE_SIZE;
            const WdrawWidth = wall.w * TILE_SIZE;
            const WdrawHeight = wall.h * TILE_SIZE;

            ctx.fillStyle = 'rgb(174, 171, 169)';
            ctx.fillRect(WdrawX, WdrawY, WdrawWidth, WdrawHeight);

        });

        corridors.forEach(corridor => {

            const CdrawX = corridor.x * TILE_SIZE;
            const CdrawY = corridor.y * TILE_SIZE;
            const CdrawWidth = corridor.w * TILE_SIZE;
            const CdrawHeight = corridor.h * TILE_SIZE;

            ctx.fillStyle = 'hsl(0, 0%, 83%)';
            ctx.fillRect(CdrawX, CdrawY, CdrawWidth, CdrawHeight);
        });

    
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
};



roadMap();
export { roadMap };