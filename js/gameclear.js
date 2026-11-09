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
    if (currentClearIndex === 0) {
        // EXIT: 메인 시작 화면으로 이동
        const clearScreen = document.getElementById('gameclear-screen');
        if (clearScreen) clearScreen.style.display = 'none';

        const startScreen = document.getElementById('start-screen');
        if (startScreen) startScreen.style.display = 'flex';

        isGameClearActive = false;
    } else {
        // RESTART: 처음부터 다시 시작
        location.reload();
    }
}