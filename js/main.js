import { player } from "./player.js";
import { moveTeacher } from "./teacher.js";
// import { roadMap } from "./map.js";

document
  .getElementById("question-modal-button")
  .addEventListener("click", () => {
    const modal = document.getElementById("question-modal");
    modal.style.width = "1328px";
    modal.style.height = "858px";
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
  player(e.code);
});
