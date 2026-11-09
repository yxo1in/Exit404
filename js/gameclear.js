import { stopTimer } from "./timer.js";

let currentClearIndex = 0; // 0: EXIT, 1: RESTART
let isGameClearActive = false;

function updateGameClearMenu() {
    const container = document.getElementById('gameclear-screen');
    if (!container) return;
    const rows = container.querySelectorAll('.gameover-option-row');
    rows.forEach((row, index) => {
        if (index === currentClearIndex) {
            row.classList.add('active');
        } else {
            row.classList.remove('active');
        }
    });
}

export function showGameClear() {
    const clearScreen = document.getElementById('gameclear-screen');
    if (clearScreen) {
        stopTimer();
        clearScreen.style.display = 'flex';
        isGameClearActive = true;
        currentClearIndex = 0;
        updateGameClearMenu();
    }
}

// js/gameclear.js

document.addEventListener('keydown', (e) => {
    if (!isGameClearActive) return;

    if (['ArrowUp', 'ArrowDown', 'w', 'W', 's', 'S', ' ', 'Enter'].includes(e.key)) {
        e.preventDefault();
    }

    if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        currentClearIndex = (currentClearIndex === 0) ? 1 : 0;
        updateGameClearMenu();
    } else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
        currentClearIndex = (currentClearIndex === 1) ? 0 : 1;
        updateGameClearMenu();
    } else if (e.key === 'Enter' || e.key === ' ') {
        selectGameClearMenu();
    }
});

function selectGameClearMenu() {
    // EXIT, RESTART 모두 새로고침으로 게임 상태를 초기화하고 시작 화면으로 돌아감
    location.reload();
}