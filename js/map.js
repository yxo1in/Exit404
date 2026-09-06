// 맵 
const TILE_SIZE = 32;
const WALL_THICKNESS = 32; 

const rooms = [
  { name: 'r1', x: 1,  y: 2,  w: 10, h: 7 },
  { name: 'r2', x: 1,  y: 11,  w: 10, h: 10 },
  { name: 'r3', x: 4,  y: 24, w: 6,  h: 5 },
  { name: 'r4', x: 13, y: 3,  w: 8,  h: 6 },
  { name: 'r5', x: 13, y: 11, w: 8,  h: 6 },
  { name: 'r6', x: 13, y: 19, w: 6,  h: 5 },
  { name: 'r7', x: 12.5, y: 26, w: 6.5,  h: 5 },
];

const roadMap = () => {
    const canvas = document.getElementById('map');
    const ctx = canvas.getContext('2d');


    // background
    // r1
    const woodTile = new Image()
    woodTile.src = '../assets/tile/wood-tile.jpeg'

    woodTile.onload = () => {
        const pattern = ctx.createPattern(woodTile, 'repeat')
        const matrix = new DOMMatrix();
        matrix.scaleSelf(0.5, 0.5);

        pattern.setTransform(matrix);

        
        rooms.forEach(room => {
            const px = room.x * TILE_SIZE;
            const py = room.y * TILE_SIZE;
            const pw = room.w * TILE_SIZE;
            const ph = room.h * TILE_SIZE;
            
            const wx = px;
            const wy = py - WALL_THICKNESS;
            const ww = pw;
            const wh = ph + WALL_THICKNESS;
            
            
            ctx.fillStyle = '#8d8888';
            ctx.fillRect(
                px,
                py - WALL_THICKNESS,
                pw,
                ph + WALL_THICKNESS
            );
            
            ctx.fillStyle = pattern;
            ctx.fillRect(
                px,
                py,
                pw,
                ph
            );
            ctx.strokeStyle= 'black'
            ctx.lineWidth = 1.5;
            ctx.strokeRect(wx, wy+WALL_THICKNESS, ww, wh-WALL_THICKNESS);
            
            ctx.strokeStyle = '#8d8888';
            ctx.lineWidth = 5;
            ctx.strokeRect(px, py-WALL_THICKNESS, pw, ph+WALL_THICKNESS);
            
            const inset = 4; 
            ctx.strokeStyle = '#393939';
            ctx.lineWidth = 2.5;
            ctx.strokeRect(
                wx + inset,
                wy + inset,
                ww - inset * 2,
                wh - inset * 2
            );
        })
    }

}    

export { roadMap }