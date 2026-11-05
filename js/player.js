import { isMove, setGoal } from "./map.js";

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

const move = () => {
  const isLeft = see === "left" ? " scaleX(-1)" : "";

  // 플레이어 DOM을 화면 정중앙에 고정 (x, y 좌표로 직접 translate 하지 않음)
  player.style.position = "fixed";
  player.style.left = "50%";
  player.style.top = "50%";
  player.style.transform = `translate(-50%, -50%)${isLeft}`;
};

const c = document.getElementById("player");
const loop = () => {
  setGoal(x, y);
  let moved = false;

  // 스태미나 소진(탈진) 상태이거나 게이지가 0이면 run을 강제로 끔
  if (isExhausted || currentStamina <= 0) {
    run = false;
  }

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

const intersect = () => {
  console.log("상호작용 키");
};

let isOpenQuestionModal = false;
let isOpenInventory = false;
// document
//   .getElementById("question-modal-button")
//   .addEventListener("click", () => {
//     const modal = document.getElementById("question-modal");
//     if (!isOpenQuestionModal && !isOpenInventory) {
//       modal.style.width = "1328px";
//       modal.style.height = "858px";
//       isOpenQuestionModal = !isOpenQuestionModal;
//     } else {
//       modal.style.width = "0px";
//       modal.style.height = "0px";
//       isOpenQuestionModal = !isOpenQuestionModal;
//     }
//   });

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

// 처음에 시작하랴고 넣은겨
setCharacter("idle-down"); // 처음엔 아래 보면서 멈춘 상태
move();
requestAnimationFrame(loop);

const getPlayerPos = () => ({ x, y });

export { playerIntersect, stop, getPlayerPos };
