let currentGameOverIndex = 0; // 0: YES, 1: NO
let isGameOverActive = false;

function updateGameOverMenu() {
    const rows = document.querySelectorAll('.gameover-option-row');
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
    if (currentGameOverIndex === 0) {
        // YES: 완전 초기화 (재시작)
        location.reload();
    } else {
        // NO: 시작 화면으로 되돌아가기
        const gameoverScreen = document.getElementById('gameover-screen');
        if (gameoverScreen) gameoverScreen.style.display = 'none';

        const startScreen = document.getElementById('start-screen');
        if (startScreen) startScreen.style.display = 'flex';

        isGameOverActive = false;
    }
}