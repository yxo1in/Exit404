import { stopTimer, getElapsedTime } from "./timer.js";
import { saveRanking } from "./supabase.js";

let currentClearIndex = 0; // 0: EXIT, 1: RESTART
let isGameClearActive = false;

export function handleGameClear() {
    // 1. 타이머 멈추기 및 최종 시간(초) 가져오기
    stopTimer();
    const finalTime = getElapsedTime();

    // 2. 게임 클리어 화면 표시
    const clearScreen = document.getElementById('gameclear-screen');
    if (clearScreen) clearScreen.style.display = 'flex';

    // 3. 사용자 이름 입력받기 (prompt 또는 input 태그 사용)
    const studentName = prompt(`클리어 타임: ${finalTime}초\n랭킹에 등록할 이름을 입력하세요:`, "익명");

    if (studentName) {
        // 4. Supabase DB에 기록 저장
        saveRanking(studentName, finalTime).then((isSuccess) => {
            if (isSuccess) {
                alert("랭킹이 등록되었습니다!");
            }
        });
    }
}

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