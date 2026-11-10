import { pressStart } from "./main.js";
import { fetchRanking } from "./supabase.js";
import { loadProblemsByCategory } from "./supabase.js";

let currentMenuIndex = 0; // 0: START, 1: RANKING, 2: LANGUAGE
const menuYPositions = [-10, 30, 79]; // 화살표 Y 위치

document.addEventListener("DOMContentLoaded", () => {
    const langSelect = document.getElementById("btn-language");

    if (langSelect) {
        // 드롭다운 변경(선택 완료) 시 실행
        langSelect.addEventListener("change", (e) => {
            const selectedCategory = e.target.value; // 'javascript', 'c', 'java'
            console.log(`선택된 카테고리: ${selectedCategory}`);

            loadProblemsByCategory(selectedCategory);

            // ★ 선택이 끝나면 포커스를 해제하여 방향키 조작이 다시 시작 화면 메뉴로 돌아오게 함
            langSelect.blur();
        });

        // 엔터/스페이스로 포커스 해제 처리
        langSelect.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                langSelect.blur();
            }
        });
    }
});

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
        const langSelect = document.getElementById('btn-language');
        if (langSelect) {
            langSelect.focus();
            if (typeof langSelect.showPicker === 'function') {
                langSelect.showPicker();
            } else {
                langSelect.click();
            }
        }
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

    pressStart();
}

export async function openRankingModal() {
    const modal = document.getElementById('ranking-modal');
    const container = document.getElementById('ranking-list-container');
    if (!modal || !container) {
        console.error("랭킹 모달 태그를 찾을 수 없습니다.");
        return;
    }

    modal.style.display = 'flex';
    container.innerHTML = '<p style="color: white; padding: 20px;">로딩 중...</p>';

    try {
        const rankings = await fetchRanking();

        if (!rankings || rankings.length === 0) {
            container.innerHTML = '<p style="color: white; padding: 20px;">등록된 랭킹 기록이 없습니다.</p>';
            return;
        }

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
        container.innerHTML = html;

    } catch (err) {
        console.error("랭킹 로드 중 에러 발생:", err);
        container.innerHTML = '<p style="color: red;">랭킹을 불러오는데 실패했습니다.</p>';
    }
}

export function closeRankingModal() {
    const modal = document.getElementById('ranking-modal');
    if (modal) modal.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
    const loadingEl = document.getElementById('loading');
    if (loadingEl) loadingEl.style.display = 'none';

    updateMenuArrow();

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
    const langSelect = document.getElementById('btn-language');

    // 현재 포커스가 언어 선택(select)에 가있는 동안에는 방향키 메뉴 이동을 방지
    if (document.activeElement === langSelect) return;

    if (e.key === 'Escape') {
        closeRankingModal();
        return;
    }

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