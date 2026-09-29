import { playerIntersect, stop } from "./player.js";
import { moveTeacher } from "./teacher.js";
// import { roadMap } from "./map.js";

let isOpenQuestionModal = false;
document
  .getElementById("question-modal-button")
  .addEventListener("click", () => {
    const modal = document.getElementById("question-modal");
    if (isOpenQuestionModal) {
      modal.style.width = "0px";
      modal.style.height = "0px";
      isOpenQuestionModal = !isOpenQuestionModal;
    } else {
      modal.style.width = "1328px";
      modal.style.height = "858px";
      isOpenQuestionModal = !isOpenQuestionModal;
    }
  });

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
// ItemModal
// ================================
const inventory = document.getElementById("inventory-modal-item");
const items = [1, 2, 3, 4, 5, 6, 7, 8];
inventory.innerHTML = items
  .map((item) => {
    return `<div class="item-wrap">아이템${item}</div>`;
  })
  .join("");


  
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
