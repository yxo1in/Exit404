import { playerIntersect, stop } from "./player.js";
import { moveTeacher } from "./teacher.js";
// import { roadMap } from "./map.js";



// ===============
// QuestionModal
// ===============
const headerMenu = [
  "File",
  "Edit",
  "Selection",
  "View",
  "Go",
  "Run",
  "Terminal",
];
document
  .getElementById("question-modal-header")
  .insertAdjacentHTML(
    "afterbegin",
    headerMenu
      .map((m) => `<div class="question-modal-header-menu">${m}</div>`)
      .join(""),
  );

const answerMenu = ["Problem", "Output", "Debug Console", "Terminal"];
document.getElementById("question-modal-answer-menu").innerHTML = answerMenu
  .map((m) => `<p class="question-modal-answer-menu-text">${m}</p>`)
  .join("");

const isCorrect = false;
document.getElementById("answer_result").innerHTML =
  `<p class="answer-result" style="color:${isCorrect ? "green" : "#b90e0a"}">${isCorrect ? "Pass" : "Error"}</p>`;

// ================================
// InventoryModal
// ================================
const inventory = document.getElementById("inventory-modal-item");
const items = [1, 2, 3, 4, 5, 6, 7, 8];
const items_explain = {
  1: "1번 아이템",
  2: "2번 아이템",
  3: "3번 아이템",
  4: "4번 아이템",
  5: "5번 아이템",
  6: "6번 아이템",
  7: "7번 아이템",
  8: "8번 아이템",
};
inventory.innerHTML = items
  .map((item, idx) => {
    return `<div class="item-wrap" data-item="${item}">아이템${item}</div>`;
  })
  .join("");

const itemName = document.getElementById("item-name");
const itemExplain = document.getElementById("item-explain");
const selectItem = (item) => {
  itemName.innerHTML = `${item} :`;
  itemExplain.innerHTML = items_explain[item];
};

inventory.querySelectorAll('.item-wrap').forEach((item) => {
  item.addEventListener('click', () => {
    const itemNum = Number(item.dataset.item); 
    selectItem(itemNum);
  })
})

// window.addEventListener("DOMContentLoaded", () => {
//   roadMap();
// });

document.addEventListener("keydown", (e) => {
  if (e.code.startsWith("Arrow")) e.preventDefault();
  playerIntersect(e.code);
});
document.addEventListener("keyup", (e) => {
  stop(e.code);
});
