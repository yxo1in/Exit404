const TILE_SIZE = 32;
const WALL_THICKNESS = 32;
const CORRIDOR_TILE = 32;

const rooms = [
  { name: "r1", x: 1, y: 2, w: 12, h: 7 },
  { name: "r2", x: 1, y: 11, w: 12, h: 12 },
  { name: "r3", x: 3, y: 26, w: 6, h: 5 },
  { name: "r4", x: 14, y: 3, w: 8, h: 6 },
  { name: "r5", x: 14, y: 11, w: 8, h: 5 },
  { name: "r6", x: 15, y: 20, w: 6, h: 5 },
  { name: "r7", x: 15, y: 27, w: 6.5, h: 5 },
];

const corridors = [
  { name: "c1", x: 6, y: 8.9, w: 2, h: 2.1 },
  { name: "c2", x: 17, y: 8.9, w: 2, h: 2.1 },
  { name: "c3", x: 11, y: 16.4, w: 2, h: 15.6 },
  { name: "c4", x: 11, y: 16.4, w: 13, h: 2.1 },
  { name: "c5", x: 22, y: 4.9, w: 2, h: 1.5 },
  { name: "c6", x: 24, y: 4.9, w: 2, h: 28 },
  { name: "c7", x: 9, y: 26.9, w: 6, h: 2.1 },
  { name: "c8", x: 17, y: 16, w: 2, h: 4 },
];



const roadMap = () => {
  const canvas = document.getElementById("map");
  const ctx = canvas.getContext("2d");

  const corridorTile = new Image();
  corridorTile.src = "../assets/tile/corridor-tile.svg";
  const toiletTile = new Image();
  toiletTile.src = "../assets/tile/toilet-tile.jpeg";
  const woodTile = new Image();
  woodTile.src = "../assets/tile/wood-tile.png";

  woodTile.onload = () => {
    const pattern = ctx.createPattern(woodTile, "repeat");
    const matrix = new DOMMatrix();
    matrix.scaleSelf(0.02, 0.015);
    pattern.setTransform(matrix);

    const corridorPattern = ctx.createPattern(corridorTile, "repeat");

    rooms.forEach((room) => {
      const px = room.x * TILE_SIZE;
      const py = room.y * TILE_SIZE;
      const pw = room.w * TILE_SIZE;
      const ph = room.h * TILE_SIZE;

      const wx = px;
      const wy = py - WALL_THICKNESS;
      const ww = pw;
      const wh = ph + WALL_THICKNESS;

      ctx.fillStyle = "#8d8888";
      ctx.fillRect(px, py - WALL_THICKNESS, pw, ph + WALL_THICKNESS);

      if (room.name === "r4") {
        const toiletPattern = ctx.createPattern(toiletTile, "repeat");
        const toiletMatrix = new DOMMatrix();
        toiletMatrix.scaleSelf(0.25, 0.25);
        toiletPattern.setTransform(toiletMatrix);
        ctx.fillStyle = toiletPattern;
      } else {
        ctx.fillStyle = pattern;
      }

      ctx.fillRect(px, py, pw, ph);

      ctx.strokeStyle = "#393939";
      ctx.lineWidth = 1.5;
      ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
      ctx.shadowOffsetX = 3;
      ctx.shadowOffsetY = 3;
      ctx.shadowBlur = 4;
      ctx.strokeRect(wx, wy + WALL_THICKNESS, ww, wh - WALL_THICKNESS);

      ctx.strokeStyle = "#8d8888";
      ctx.lineWidth = 5;
      ctx.strokeRect(px, py - WALL_THICKNESS, pw, ph + WALL_THICKNESS);

      const inset = 4;
      ctx.strokeStyle = "#393939";
      ctx.lineWidth = 2.5;
      ctx.shadowColor = "transparent";
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      ctx.shadowBlur = 0;
      ctx.strokeRect(wx + inset, wy + inset, ww - inset * 2, wh - inset * 2);
    });

    corridors.forEach((corridor) => {
      const cx = CORRIDOR_TILE * corridor.x;
      const cy = CORRIDOR_TILE * corridor.y;
      const cw = CORRIDOR_TILE * corridor.w;
      const ch = CORRIDOR_TILE * corridor.h;
      const inset = 12;

      ctx.fillStyle = "#8d8888";
      ctx.fillRect(
        cx - inset / 2,
        cy + inset / 2 - 1,
        cw + inset,
        ch - inset - 2,
      );

      ctx.fillStyle = corridorPattern;
      ctx.fillRect(cx, cy, cw, ch);
    });

    drawCorridorBorders(ctx);
  };
};

export { roadMap };