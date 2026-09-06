import { player } from "./player.js";
import { moveTeacher } from "./teacher.js"
import { roadMap } from "./map.js";

window.addEventListener('DOMContentLoaded', () => {
    roadMap();
});

document.addEventListener("keydown", e => {
    player(e.code);
})