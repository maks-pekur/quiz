import { quizStructure } from "../data/quiz-structure.js";
import { clearProgress } from "../utils/storage.js";
import { questionIndex, stepIndex } from "./quiz-state.js";

export function goToNextStep({ renderStep }) {
  const currentStep = quizStructure[stepIndex];
  const isLastStep = stepIndex === quizStructure.length - 1;

  if (
    currentStep.type === "block" &&
    questionIndex < currentStep.questions.length - 1
  ) {
    renderStep(stepIndex, questionIndex + 1);
  } else if (!isLastStep) {
    renderStep(stepIndex + 1, 0);
  } else {
    redirectToResult();
    clearProgress();
  }
}

function redirectToResult() {
  window.location.href = "./results.html";
}
