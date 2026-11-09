import { init } from "./main.js";
import { fetchRanking } from "./supabase.js";
import { insertDummyRankings } from "./supabase.js";
import { startTimer } from "./timer.js";
window.insertDummyRankings = insertDummyRankings; // 콘솔에서 호출할 수 있도록 window 객체에 등록


let currentMenuIndex = 0; // 0: START, 1: RANKING, 2: LANGUAGE
const menuYPositions = [-10, 30, 79]; // 화살표 Y 위치

// 1. 화살표 위치 업데이트
function updateMenuArrow() {
    const arrowLeft = document.getElementById('menu-arrow-left');
    const arrowRight = document.getElementById('menu-arrow-right');
    if (!arrowLeft || !arrowRight) return;

    const targetY = menuYPositions[currentMenuIndex];
    arrowLeft.style.top = `${targetY}px`;
    arrowRight.style.top = `${targetY}px`;
}

// 2. 메뉴 선택 동작
function selectMenu(index) {
    if (index === 0) {
        startGame();
    } else if (index === 1) {
        openRankingModal();
    } else if (index === 2) {
        console.log("LANGUAGE 모달 열기");
    }
}

// 3. 게임 시작 처리
function startGame() {
    const startScreen = document.getElementById('start-screen');
    const loadingEl = document.getElementById('loading');

    if (startScreen) startScreen.style.display = 'none';
    if (loadingEl) loadingEl.style.display = 'none';

    const mapEl = document.getElementById('map');
    const staminaEl = document.getElementById('stamina-container');
    const gameEl = document.getElementById('game');

    if (mapEl) mapEl.style.display = 'block';
    if (staminaEl) staminaEl.style.display = 'flex';
    if (gameEl) gameEl.style.display = 'block';

    init();
    startTimer(); // ★ 게임 시작 시 초 단위 타이머 작동!

    window.dispatchEvent(new Event('resize'));
}

export async function openRankingModal() {
    const modal = document.getElementById('ranking-modal');
    const container = document.getElementById('ranking-list-container');
    if (!modal || !container) {
        console.error("랭킹 모달 태그를 찾을 수 없습니다.");
        return;
    }

    // 1. 모달 표시 및 로딩 문구 세팅
    modal.style.display = 'flex';
    container.innerHTML = '<p style="color: white; padding: 20px;">로딩 중...</p>';

    try {
        // 2. Supabase 데이터 가져오기
        const rankings = await fetchRanking();

        // 데이터 확인용 콘솔 출력 (F12에서 확인 가능)
        console.log("불러온 랭킹 데이터:", rankings);

        if (!rankings || rankings.length === 0) {
            container.innerHTML = '<p style="color: white; padding: 20px;">등록된 랭킹 기록이 없습니다.</p>';
            return;
        }

        // 3. 테이블 HTML 생성
        let html = `
      <table class="ranking-table">
        <thead>
          <tr>
            <th>순위</th>
            <th>이름</th>
            <th>기록(초)</th>
          </tr>
        </thead>
        <tbody>
    `;

        rankings.forEach((item, index) => {
            html += `
        <tr>
          <td>${index + 1}</td>
          <td>${item.student_name || '익명'}</td>
          <td>${item.play_time}초</td>
        </tr>
      `;
        });

        html += '</tbody></table>';

        // 4. 화면에 테이블 렌더링
        container.innerHTML = html;

    } catch (err) {
        console.error("랭킹 로드 중 에러 발생:", err);
        container.innerHTML = '<p style="color: red;">랭킹을 불러오는데 실패했습니다.</p>';
    }
}

// 5. 랭킹 모달 닫기
export function closeRankingModal() {
    const modal = document.getElementById('ranking-modal');
    if (modal) modal.style.display = 'none';
}

// 6. 키보드 및 이벤트 리스너 통합 등록
document.addEventListener('DOMContentLoaded', () => {
    const loadingEl = document.getElementById('loading');
    if (loadingEl) loadingEl.style.display = 'none';

    // 화살표 위치 초기화
    updateMenuArrow();

    // 버튼 마우스 이벤트 등록
    const menuButtons = document.querySelectorAll('.menu-btn');
    menuButtons.forEach((btn) => {
        btn.addEventListener('mouseenter', () => {
            currentMenuIndex = parseInt(btn.dataset.index, 10);
            updateMenuArrow();
        });

        btn.addEventListener('click', () => {
            selectMenu(currentMenuIndex);
        });
    });

    const btnClose = document.getElementById('btn-close-ranking');
    if (btnClose) {
        btnClose.addEventListener('click', closeRankingModal);
    }
});

// 키보드 조작 (글로벌 윈도우 키 이벤트)
window.addEventListener('keydown', (e) => {
    const startScreen = document.getElementById('start-screen');
    const rankingModal = document.getElementById('ranking-modal');

    // ESC 누르면 랭킹 모달 닫기
    if (e.key === 'Escape') {
        closeRankingModal();
        return;
    }

    // 시작 화면이 닫혀있거나 랭킹 모달이 열려있으면 방향키 무시
    if (!startScreen || startScreen.style.display === 'none') return;
    if (rankingModal && rankingModal.style.display === 'flex') return;

    if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
        e.preventDefault();
        currentMenuIndex = (currentMenuIndex + 1) % 3;
        updateMenuArrow();
    } else if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        e.preventDefault();
        currentMenuIndex = (currentMenuIndex - 1 + 3) % 3;
        updateMenuArrow();
    } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        selectMenu(currentMenuIndex);
    }
});