import { isMove, setGoal, deskIsNear, removeDesk, isExit } from "./map.js";
import { problemList, items } from "./main.js";

let run = false;

// 스태미나 관련 변수
const MAX_STAMINA = 100;
let currentStamina = MAX_STAMINA;
const DRAIN_RATE = 0.6;
const RECOVERY_RATE = 0.3;
let isExhausted = false;

const staminaBar = document.getElementById("stamina-bar");
const staminaContainer = document.getElementById("stamina-container");

const character = {
  "idle-up": "mirim_student back.png",
  "idle-down": "mirim_student front.png",
  "idle-right": "mirim_student right_side.png",
  "idle-left": "mirim_student right_side.png",
  "walk-up": "mirim_student back_walking.gif",
  "walk-down": "mirim_student_front_walking.gif",
  "walk-right": "mirim_student right_side_walking.gif",
  "walk-left": "mirim_student right_side_walking.gif",
};

const player = document.getElementById("player");

let x = 260;
let y = 230;
let see = "down";
let pressed = {};

const setCharacter = (move) => {
  if (player.dataset.sprite === move) return;
  player.dataset.sprite = move;
  player.src = encodeURI(`./assets/character/${character[move]}`);
};

let isOpenQuestionModal = false;
let isOpenInventory = false;
let isEscaped = false;
const move = () => {
  const isLeft = see === "left" ? " scaleX(-1)" : "";

  // 플레이어 DOM을 화면 정중앙에 고정 (x, y 좌표로 직접 translate 하지 않음)
  player.style.position = "fixed";
  player.style.left = "50%";
  player.style.top = "50%";
  player.style.transform = `translate(-50%, -50%)${isLeft}`;
};

const c = document.getElementById("player");

const isSolve = Array.from({ length: 10 }, () => 0);
let currentProblem = -1;
let currentDesk = null;

const pickProblem = () => {
  if (isSolve.every((solved) => solved === 1)) return -1;

  let index;
  do {
    index = Math.floor(Math.random() * isSolve.length);
  } while (isSolve[index] === 1);
  return index;
};

const solveProblem = (index) => {
  isSolve[index] = 1;
  removeDesk(currentDesk);
};

let toastTimer = null;

const showAlert = (message) => {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer); // 이전 타이머 취소
  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
};

let startTime = 0;
let timerId = null;

const updateTimer = () => {
  const total = Math.floor((Date.now() - startTime) / 1000);
  const min = String(Math.floor(total / 60)).padStart(2, "0");
  const sec = String(total % 60).padStart(2, "0");
  document.getElementById("timer").textContent = `${min}:${sec}`;
};

const startTimer = () => {
  startTime = Date.now();
  timerId = setInterval(updateTimer, 250);
};

let closeTimer = null;

const closeQuestionModal = () => {
  const modal = document.getElementById("question-modal");
  modal.style.width = "0px";
  modal.style.height = "0px";
  isOpenQuestionModal = false;
};

const scheduleCloseModal = (ms) => {
  clearTimeout(closeTimer); // 이전 타이머 취소
  closeTimer = setTimeout(closeQuestionModal, ms);
};

const intersect = () => {
  /* 상호작용 구현
    1. 상호작용을 눌렀을 때 이 함수가 호출됨.
    2. 캐릭터 좌표값을 배열로 보내고 상하좌우에 2가 있다면
    3. 문제 모달 띄우기 + 게임 진행 멈추기
  */
  if (!isEscaped && isExit(x, y)) {
    // 탈출 처리 구현하기 **
    if (items.length === 10) {
      console.log("escape");
      isEscaped = true;x 
      clearInterval(timerId);
    } else {
      showAlert("아이템이 부족합니다");
    }
    return;
  }

  // console.log(deskIsNear(x, y))
  const desk = deskIsNear(x, y);
  if (desk) {
    if (isOpenInventory) {
      inventoryClose();
    }
    const modal = document.getElementById("question-modal");
    const questionTitle = document.getElementById("question-title");
    if (!isOpenQuestionModal) {
      const index = pickProblem();
      if (index === -1) return; // 모든 문제를 푼 상태

      currentProblem = index;
      currentDesk = desk;
      questionTitle.textContent = problemList[index].question;
      document.getElementById("answer").value = "";
      document.getElementById("answer-submit").disabled = false;
      document.getElementById("answer_result").innerHTML = "";

      modal.style.width = "1328px";
      modal.style.height = "858px";
      isOpenQuestionModal = true;
      scheduleCloseModal(20000);
    }
  }
};
const loop = () => {
  setGoal(x, y);
  let moved = false;

  // 스태미나 소진(탈진) 상태이거나 게이지가 0이면 run을 강제로 끔
  if (isExhausted || currentStamina <= 0) {
    run = false;
  }

  if (!isOpenInventory && !isOpenQuestionModal) {
    if (!run) {
      const SPEED = 4;
      if (pressed.ArrowUp) {
        if (isMove(x, y - SPEED)) {
          y -= SPEED;
          moved = true;
        }
        see = "up";
      } else if (pressed.ArrowDown) {
        if (isMove(x, y + SPEED)) {
          y += SPEED;
          moved = true;
        }
        see = "down";
      } else if (pressed.ArrowLeft) {
        if (isMove(x - SPEED, y)) {
          x -= SPEED;
          moved = true;
        }
        see = "left";
      } else if (pressed.ArrowRight) {
        if (isMove(x + SPEED, y)) {
          x += SPEED;
          moved = true;
        }
        see = "right";
      }
    } else if (run) {
      const SPEED = 6;
      if (pressed.ArrowUp) {
        if (isMove(x, y - SPEED)) {
          y -= SPEED;
          moved = true;
        }
        see = "up";
      } else if (pressed.ArrowDown) {
        if (isMove(x, y + SPEED)) {
          y += SPEED;
          moved = true;
        }
        see = "down";
      } else if (pressed.ArrowLeft) {
        if (isMove(x - SPEED, y)) {
          x -= SPEED;
          moved = true;
        }
        see = "left";
      } else if (pressed.ArrowRight) {
        if (isMove(x + SPEED, y)) {
          x += SPEED;
          moved = true;
        }
        see = "right";
      }
    }
  }

  if (run && moved) {
    currentStamina = Math.max(0, currentStamina - DRAIN_RATE);
    if (currentStamina === 0) {
      isExhausted = true;
    }
  } else {
    currentStamina = Math.min(MAX_STAMINA, currentStamina + RECOVERY_RATE);
    if (isExhausted && currentStamina >= 20) {
      isExhausted = false;
    }
  }

  // ⚡ [추가] UI 게이지 업데이트
  if (staminaBar) {
    staminaBar.style.width = `${(currentStamina / MAX_STAMINA) * 90}%`;
  }

  setCharacter(moved ? `walk-${see}` : `idle-${see}`);
  move();

  requestAnimationFrame(loop); // loop가 종료된 시점에 다시 loop 호출 != 재귀
  // 재귀는 현재 함수가 완료되기 전에 같은 함수를 다시 호출
};

const inventoryModal = document.getElementById("inventory-modal");
const inventoryOpen = () => {
  // width: 1093px;
  // height: 676px;
  if (!isOpenInventory && !isOpenQuestionModal) {
    inventoryModal.style.width = "1093px";
    inventoryModal.style.height = "676px";
    isOpenInventory = !isOpenInventory;
  }
};

const inventoryClose = () => {
  if (isOpenInventory) {
    inventoryModal.style.width = "0px";
    inventoryModal.style.height = "0px";
    isOpenInventory = !isOpenInventory;
  }
};
const playerIntersect = (key) => {
  pressed[key] = true;
  if (key === "KeyF") {
    intersect();
  }
  if (key === "KeyI") {
    console.log("열린당");
    inventoryOpen();
  }
  if (key === "Escape") {
    inventoryClose();
  }
  if (key === "ShiftLeft") {
    run = true;
  }
};
const stop = (key) => {
  pressed[key] = false;
  run = false;
};

// pressed를 객체 형식으로 해서
// true면 gif로 하고
// false면(멈추거나 방향을 바꾸면) png로
window.addEventListener("blur", () => {
  pressed = {};
});

// 데이터를 불러온 뒤 main.js에서 호출
const startPlayer = () => {
  setCharacter("idle-down"); // 처음엔 아래 보면서 멈춘 상태
  move();
  startTimer();
  requestAnimationFrame(loop);
};

const getPlayerPos = () => ({ x, y });

export {
  startPlayer,
  playerIntersect,
  stop,
  getPlayerPos,
  isOpenInventory,
  isOpenQuestionModal,
  currentProblem,
  solveProblem,
  scheduleCloseModal,
  showAlert
};
