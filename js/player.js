const SPEED = 8;

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

let x = 100;
let y = 100;
let see = "down";
let pressed = {};

const setCharacter = (move) => {
  // 움직이고 있는데 같은 행동을 하면 그냥 그대로 유지
  if (player.dataset.sprite === move) return;
  player.dataset.sprite = move;
  player.src = encodeURI(`./assets/character/${character[move]}`);
};

const move = () => {
  const isLeft = see === "left" ? " scaleX(-1)" : "";
  player.style.transform = `translate(${x}px, ${y}px)${isLeft}`;
};

const loop = () => {
  let moved = false;

  if (pressed.ArrowUp) {
    y -= SPEED;
    see = "up";
    moved = true;
  } else if (pressed.ArrowDown) {
    y += SPEED;
    see = "down";
    moved = true;
  } else if (pressed.ArrowLeft) {
    x -= SPEED;
    see = "left";
    moved = true;
  } else if (pressed.ArrowRight) {
    x += SPEED;
    see = "right";
    moved = true;
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
document
  .getElementById("question-modal-button")
  .addEventListener("click", () => {
    const modal = document.getElementById("question-modal");
    if (!isOpenQuestionModal && !isOpenInventory) {
      modal.style.width = "1328px";
      modal.style.height = "858px";
      isOpenQuestionModal = !isOpenQuestionModal;
    } else {
      modal.style.width = "0px";
      modal.style.height = "0px";
      isOpenQuestionModal = !isOpenQuestionModal;
    }
  });

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
    inventoryOpen();
  }
  if (key === "Escape") {
    inventoryClose();
  }
};

const stop = (key) => {
  pressed[key] = false;
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

export { playerIntersect, stop };
