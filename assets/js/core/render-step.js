import { renderInfo } from "../components/info.js";
import { toggleNavButtons } from "../components/nav-buttons.js";
import { renderProgress } from "../components/progress.js";
import { renderQuestion } from "../components/question.js";
import { quizStructure } from "../data/quiz-structure.js";
import { applyBackground } from "../utils/background.js";
import { saveProgress } from "../utils/storage.js";
import { goToNextStep } from "./quiz-engine.js";
import { selectedIndex, setState } from "./quiz-state.js";
import { startTransition } from "./transition.js";

const quizContainer = document.getElementById("quiz-container");
const quiz = document.getElementById("quiz");
const blockTitle = document.getElementById("block_title");

function renderBlockStep(stepIdx, questionIdx) {
  renderQuestion(stepIdx, questionIdx, quiz, renderStep);
  toggleNavButtons(false);
}

function renderInfoStep(step) {
  renderInfo(step, quiz);
  toggleNavButtons(true);
}

function renderFinalStep(step) {
  toggleNavButtons(false);
  const blockDescription = document.getElementById("block_description");
  blockDescription.style.display = "block"
  blockDescription.textContent = step.text;

  const finalBtn = document.getElementById("final_btn");
  if (finalBtn) {
    finalBtn.style.display = "inline-block";
    finalBtn.onclick = () => {
      blockTitle.style.display = "none";
      blockDescription.style.display = "none";
      finalBtn.style.display = "none";

      startTransition({
        callback: () => {
          quizContainer.style.display = "none";
          goToNextStep({ renderStep });
        },
      });
    };
  }
}

export function renderStep(stepIdx, questionIdx) {
  const step = quizStructure[stepIdx];

  applyBackground(step);
  setState(stepIdx, questionIdx);
  saveProgress(stepIdx, questionIdx, selectedIndex);

  quizContainer.classList.remove("block", "info", "final");
  quizContainer.classList.add(step.type);

  quiz.classList.remove("fade");
  quiz.innerHTML = "";

  blockTitle.textContent = step.title;
  blockTitle.style.color = step.titleColor;

  if (step.type === "block") {
    renderBlockStep(stepIdx, questionIdx);
  } else if (step.type === "info") {
    renderInfoStep(step);
  } else if (step.type === "final") {
    renderFinalStep(step);
  }

  renderProgress(stepIdx, questionIdx);
}
