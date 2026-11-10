import { stopTimer, getElapsedTime } from "./timer.js";
import { saveRanking } from "./supabase.js";

let currentClearIndex = 0; // 0: EXIT, 1: RESTART
let isGameClearActive = false;

// 키보드 이벤트 핸들러를 별도 함수로 분리
function handleClearMenuKeydown(e) {
    if (!isGameClearActive) return;

    if (['ArrowUp', 'ArrowDown', 'w', 'W', 's', 'S', ' ', 'Enter'].includes(e.key)) {
        e.preventDefault();
        e.stopPropagation(); // 게임 플레이 키 이벤트로 전파되는 것 완전 차단
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
}

// 게임 클리어 시 호출되는 메인 함수
export async function showGameClear() {
    const clearScreen = document.getElementById('gameclear-screen');
    if (clearScreen) {
        stopTimer();
        clearScreen.style.display = 'flex';
        isGameClearActive = true;
        currentClearIndex = 0;
        updateGameClearMenu();
        document.addEventListener('keydown', handleClearMenuKeydown);

        // 이름 입력 및 Supabase DB 저장
        await onGameClear();
    }
}

async function onGameClear() {
    const actualPlayTime = getElapsedTime();

    // prompt 창이 뜨면서 키 입력 상태가 꼬이는 것을 방지하기 위해 약간의 딜레이 후 실행
    setTimeout(async () => {
        const studentName = prompt(`기록: ${actualPlayTime}초\n랭킹에 등록할 이름을 입력하세요:`);

        if (!studentName || studentName.trim() === "") {
            alert("이름을 입력하지 않아 랭킹이 저장되지 않았습니다.");
            return;
        }

        const success = await saveRanking(studentName.trim(), actualPlayTime);

        if (success) {
            alert(`[${studentName}]님의 기록(${actualPlayTime}초)이 랭킹에 성공적으로 등록되었습니다.`);
        } else {
            alert("랭킹 저장에 실패했습니다. 다시 시도해 주세요.");
        }
    }, 100);
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

function selectGameClearMenu() {
    // 이벤트 리스너 정리 후 새로고침
    document.removeEventListener('keydown', handleClearMenuKeydown);
    location.reload();
}