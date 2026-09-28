import { playerIntersect, stop } from "./player.js";
import { moveTeacher } from "./teacher.js";
// import { roadMap } from "./map.js";

let isOpenQuestionModal = false;
document
  .getElementById("question-modal-button")
  .addEventListener("click", () => {
    const modal = document.getElementById("question-modal");
    if(isOpenQuestionModal){
        modal.style.width = "0px";
        modal.style.height = "0px";
        isOpenQuestionModal = !isOpenQuestionModal
    }
    else{
        modal.style.width = "1328px";
        modal.style.height = "858px";
        isOpenQuestionModal = !isOpenQuestionModal
    }
  });

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