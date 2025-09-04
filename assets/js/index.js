import { initProgressBar } from "./components/progress.js";
import {
  questionIndex,
  selectedIndex,
  setState,
  stepIndex,
} from "./core/quiz-state.js";
import { renderStep } from "./core/render-step.js";
import { startTransition } from "./core/transition.js";
import { quizStructure } from "./data/quiz-structure.js";
import { applyBackground } from "./utils/background.js";
import { loadProgress } from "./utils/storage.js";

const saved = loadProgress();
if (saved) {
  setState(saved.stepIndex || 0, saved.questionIndex || 0);
  Object.assign(selectedIndex, saved.selectedIndex || {});
}

applyBackground(quizStructure[stepIndex]);

startTransition({
  callback: () => {
    initProgressBar();
    renderStep(stepIndex, questionIndex);
  },
});
