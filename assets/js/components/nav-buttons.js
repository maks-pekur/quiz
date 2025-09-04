import { questionIndex, stepIndex } from "../core/quiz-state.js";
import { renderStep } from "../core/render-step.js";
import { startTransition } from "../core/transition.js";
import { quizStructure } from "../data/quiz-structure.js";

const backButton = document.getElementById("prev_btn");
const nextButton = document.getElementById("next_btn");

export function toggleNavButtons(visible) {
  backButton.style.display = "none";
  nextButton.style.display = visible ? "flex" : "none";
}

backButton?.addEventListener("click", () => {
  let newStep = stepIndex;
  let newQuestion = questionIndex;

  const currentStep = quizStructure[stepIndex];

  if (currentStep.type === "block" && questionIndex > 0) {
    newQuestion--;
  } else if (stepIndex > 0) {
    newStep--;
    const prevStep = quizStructure[newStep];
    newQuestion = prevStep.type === "block" ? prevStep.questions.length - 1 : 0;
  }

  renderStep(newStep, newQuestion);
});

nextButton?.addEventListener("click", () => {
  if (stepIndex < quizStructure.length - 1) {
    nextButton.disabled = true;

    const newStep = stepIndex + 1;

    startTransition({
      callback: () => {
        renderStep(newStep, 0);
        nextButton.disabled = false;
      },
    });
  }
});
