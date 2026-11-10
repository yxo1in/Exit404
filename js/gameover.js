import { stopTimer } from "./timer.js";

let currentGameOverIndex = 0; // 0: YES, 1: NO
let isGameOverActive = false;

// js/gameover.js

function updateGameOverMenu() {
    const gameoverScreen = document.getElementById('gameover-screen');
    if (!gameoverScreen) return;

    const rows = gameoverScreen.querySelectorAll('.gameover-option-row');
    rows.forEach((row, index) => {
        if (index === currentGameOverIndex) {
            row.classList.add('active');
        } else {
            row.classList.remove('active');
        }
    });
}

export function showGameOver() {
    const gameoverScreen = document.getElementById('gameover-screen');
    if (gameoverScreen) {
        stopTimer();
        gameoverScreen.style.display = 'flex';
        isGameOverActive = true;
        currentGameOverIndex = 0;
        updateGameOverMenu();
    }
}

// 키보드 조작 이벤트 (반응성 최적화 및 기본 스크롤 방지)
document.addEventListener('keydown', (e) => {
    if (!isGameOverActive) return;

    // 방향키나 스페이스바 입력 시 화면이 아래위로 흔들리거나 키가 씹히는 현상 방지
    if (['ArrowUp', 'ArrowDown', 'w', 'W', 's', 'S', ' ', 'Enter'].includes(e.key)) {
        e.preventDefault();
    }

    if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        currentGameOverIndex = (currentGameOverIndex === 0) ? 1 : 0;
        updateGameOverMenu();
    } else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
        currentGameOverIndex = (currentGameOverIndex === 1) ? 0 : 1;
        updateGameOverMenu();
    } else if (e.key === 'Enter' || e.key === ' ') {
        selectGameOverMenu();
    }
});

function selectGameOverMenu() {
    // YES, NO 모두 새로고침으로 게임 상태를 초기화하고 시작 화면으로 돌아감
    location.reload();
}