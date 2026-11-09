import { init } from "./main.js";

let currentMenuIndex = 0; // 0: START, 1: RANKING, 2: LANGUAGE

document.addEventListener('DOMContentLoaded', () => {
    const loadingEl = document.getElementById('loading');
    if (loadingEl) {
        loadingEl.style.display = 'none';
    }
});

// 각 메뉴 선택 시 화살표가 가리킬 Y 좌표 (px)
const menuYPositions = [-10, 30, 79];

// 화살표 위치 갱신 함수
function updateMenuArrow() {
    const arrowLeft = document.getElementById('menu-arrow-left');
    const arrowRight = document.getElementById('menu-arrow-right');
    if (!arrowLeft || !arrowRight) return;

    const targetY = menuYPositions[currentMenuIndex];

    // 좌/우 화살표의 top 위치 변경
    arrowLeft.style.top = `${targetY}px`;
    arrowRight.style.top = `${targetY}px`;
}

function selectMenu(index) {
    if (index === 0) {
        startGame();
    } else if (index === 1) {
        console.log("RANKING 모달 열기");
    } else if (index === 2) {
        console.log("LANGUAGE 모달 열기");
    }
}


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

    // 4. 캔버스 사이즈 갱신
    window.dispatchEvent(new Event('resize'));
}

document.addEventListener('DOMContentLoaded', () => {

    // 키보드 조작 (방향키, W/S, Enter, Space)
    window.addEventListener('keydown', (e) => {
        const startScreen = document.getElementById('start-screen');
        if (!startScreen || startScreen.style.display === 'none') return;

        if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
            currentMenuIndex = (currentMenuIndex + 1) % 3; // 아래로 이동
            updateMenuArrow();
        } else if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
            currentMenuIndex = (currentMenuIndex - 1 + 3) % 3; // 위로 이동
            updateMenuArrow();
        } else if (e.key === 'Enter' || e.key === ' ') {
            selectMenu(currentMenuIndex);
        }
    });

    // 마우스 호버 및 클릭 처리
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

    // 화면 로드 즉시 화살표 초기 위치 지정
    updateMenuArrow();
});