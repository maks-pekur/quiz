import { goToNextStep } from "../core/quiz-engine.js";
import { selectedIndex } from "../core/quiz-state.js";
import { renderStep } from "../core/render-step.js";
import { startTransition } from "../core/transition.js";
import { quizStructure } from "../data/quiz-structure.js";
import { animateAnswersWaterfall } from "../utils/animation.js";

export function renderQuestion(stepIdx, questionIdx, container) {
  const step = quizStructure[stepIdx];
  const question = step.questions[questionIdx];

  const questionElem = document.createElement("div");
  questionElem.className = "question";
  questionElem.textContent = question.text;

  const answersElem = document.createElement("ul");
  answersElem.className = "answers";

  answersElem.onclick = (event) => {
    const item = event.target.closest(".answer-button");
    if (item) {
      const index = [...answersElem.children].indexOf(item);
      const key = `${stepIdx}_${questionIdx}`;
      selectedIndex[key] = index;

      answersElem
        .querySelectorAll(".answer-button")
        .forEach((el) => el.classList.remove("active"));
      item.classList.add("active");

      startTransition({
        callback: () =>
          goToNextStep({
            renderStep,
          }),
      });
    }
  };

  question.answers.forEach((answer, index) => {
    const item = document.createElement("li");
    item.className = "answer-button";

    // const globalIndex = getGlobalAnswerIndex(stepIdx, questionIdx, index);
    // item.innerHTML = `
    //   <span class="answer-number">${globalIndex}.</span>
    //   <span class="answer-line"></span>
    //   <span class="answer-text">${answer}</span>
    // `;

    item.innerHTML = `
      <span class="answer-text">${answer}</span>
    `;

    if (selectedIndex[`${stepIdx}_${questionIdx}`] === index) {
      item.classList.add("active");
    }

    answersElem.appendChild(item);
  });

  container.appendChild(questionElem);
  container.appendChild(answersElem);
  animateAnswersWaterfall(answersElem);
}
