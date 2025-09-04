import { quizStructure } from "../data/quiz-structure.js";

export function initProgressBar() {
  const progressBar = document.getElementById("progress");
  quizStructure.forEach((step) => {
    const el = document.createElement("div");
    if (step.type === "block") {
      el.className = "step";
      el.innerHTML = '<div class="step-fill" style="width: 0%;"></div>';
    } else if (step.type === "info" || step.type === "final") {
      el.className = "dot";
    }
    progressBar.appendChild(el);
  });
}

export function renderProgress(currentStepIndex, currentQuestionIndex) {
  const progressBar = document.getElementById("progress");

  if (!progressBar.children.length) {
    initProgressBar();
  }

  quizStructure.forEach((step, i) => {
    const el = progressBar.children[i];

    if (step.type === "block") {
      const fill = el.querySelector(".step-fill");
      if (i < currentStepIndex) {
        fill.style.width = "100%";
      } else if (i === currentStepIndex) {
        const percent =
          ((currentQuestionIndex + 1) / step.questions.length) * 100;
        fill.style.width = `${percent}%`;
      } else {
        fill.style.width = "0%";
      }
    }

    if (step.type === "info") {
      if (i <= currentStepIndex) {
        el.classList.add("completed");
      } else {
        el.classList.remove("completed");
      }
    }
  });
}
