// js/timer.js

let timerInterval = null;
let secondsElapsed = 0;

export function startTimer() {
    stopTimer(); // 기존 타이머 중복 실행 방지
    secondsElapsed = 0;
    updateTimerDisplay();

    const timerEl = document.getElementById("timer-container");
    if (timerEl) timerEl.style.display = "block";

    timerInterval = setInterval(() => {
        secondsElapsed++;
        updateTimerDisplay();
    }, 1000);
}

export function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

export function resetTimer() {
    stopTimer();
    secondsElapsed = 0;
    updateTimerDisplay();
    const timerEl = document.getElementById("timer-container");
    if (timerEl) timerEl.style.display = "none";
}

export function getElapsedTime() {
    return secondsElapsed; // 초 단위 반환 (Supabase 저장용)
}

function updateTimerDisplay() {
    const displayEl = document.getElementById("timer-display");
    if (!displayEl) return;

    const minutes = Math.floor(secondsElapsed / 60);
    const seconds = secondsElapsed % 60;

    const formattedMin = String(minutes).padStart(2, "0");
    const formattedSec = String(seconds).padStart(2, "0");

    displayEl.textContent = `${formattedMin}:${formattedSec}`;
}