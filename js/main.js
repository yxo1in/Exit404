import {
  startPlayer,
  playerIntersect,
  stop,
  isOpenQuestionModal,
  currentProblem,
  solveProblem,
  scheduleCloseModal,
  showAlert,
} from "./player.js";
import { moveTeacher, increaseTeacherSpeed } from "./teacher.js";
import { roadMap } from "./map.js";
// ===============
// QuestionModal
// ===============
let problemList = [];
const headerMenu = [
  "File",
  "Edit",
  "Selection",
  "View",
  "Go",
  "Run",
  "Terminal",
];
document.getElementById("question-modal-header").innerHTML = headerMenu
  .map((m) => `<div class="question-modal-header-menu">${m}</div>`)
  .join("");

const answerMenu = ["Problem", "Output", "Debug Console", "Terminal"];
document.getElementById("question-modal-answer-menu").innerHTML = answerMenu
  .map((m) => `<p class="question-modal-answer-menu-text">${m}</p>`)
  .join("");

const showAnswerResult = (isCorrect, answer) => {
  document.getElementById("answer_result").innerHTML =
    `<p class="answer-result" style="color:${isCorrect ? "green" : "#b90e0a"}">${isCorrect ? "Pass" : `Error answer : ${answer}`}</p>`;
};

const answerInput = document.getElementById("answer");
const submitAnswer = async () => {
  const answer = answerInput.value.trim();
  if (!answer) return;

  document.getElementById("answer-submit").disabled = true;

  const index = currentProblem;
  const { checkAnswer } = await import("./quiz_service.js");
  const { isCorrect, correctAnswer} = await checkAnswer(
    problemList[index].id,
    answer,
  );

  showAnswerResult(isCorrect, correctAnswer);
  if (isCorrect) {
    solveProblem(index);
    addItem(index);
  } else if (!isCorrect) {
    increaseTeacherSpeed();
  }
  scheduleCloseModal(2000);
};
document
  .getElementById("answer-submit")
  .addEventListener("click", submitAnswer);

// ================================
// InventoryModal
// ================================
const ITEM_LIST = [
  { 1: "열쇠1" },
  { 2: "열쇠2" },
  { 3: "열쇠3" },
  { 4: "열쇠4" },
  { 5: "열쇠5" },
  { 6: "열쇠6" },
  { 7: "열쇠7" },
  { 8: "열쇠8" },
  { 9: "열쇠9" },
  { 10: "열쇠10" },
];
const inventory = document.getElementById("inventory-modal-item");
const items = [];

const itemName = document.getElementById("item-name");
const itemExplain = document.getElementById("item-explain");
const selectItem = (key, value) => {
  itemName.innerHTML = `${key} :`;
  itemExplain.innerHTML = value;
};

const renderInventory = () => {
  inventory.innerHTML = items
    .map((item) => {
      const [key, value] = Object.entries(item)[0];
      return `<div class="item-wrap" data-key="${key}" data-value="${value}">${value}</div>`;
    })
    .join("");

  inventory.querySelectorAll(".item-wrap").forEach((item) => {
    item.addEventListener("click", () => {
      selectItem(item.dataset.key, item.dataset.value);
    });
  });
};

const addItem = (index) => {
  const item = ITEM_LIST[index];
  if (items.includes(item)) return; // 제출 버튼을 여러 번 눌러도 한 번만 추가
  showAlert("아이템이 지급되었습니다. ");
  items.push(item);
  renderInventory();
};

renderInventory();

let isStartPressed = false;
let isGameRunning = false;

// START를 눌렀고 문제도 불러온 뒤에 한 번만 게임 시작
const runGame = () => {
  if (isGameRunning || !isStartPressed || problemList.length === 0) return;
  isGameRunning = true;

  roadMap();
  startPlayer();
  moveTeacher();

  document.addEventListener("keydown", (e) => {
    if (e.code.startsWith("Arrow") && !isOpenQuestionModal) e.preventDefault();
    playerIntersect(e.code);
  });
  document.addEventListener("keyup", (e) => {
    stop(e.code);
  });
};

const pressStart = () => {
  isStartPressed = true;
  runGame();
};

const init = (problems = []) => {
  const loading = document.getElementById("loading");
  if (loading) {
    loading.style.display = "none";
    problemList = problems;
    console.log(problems);
    if (problems.length === 0) {
      loading.textContent = "문제를 불러오지 못했습니다.";
      return;
    }

    runGame();
  }
};
export { init, pressStart, problemList, items };
