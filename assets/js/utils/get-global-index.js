import { quizStructure } from "../data/quiz-structure.js";

export function getGlobalAnswerIndex(stepIdx, questionIdx, answerIdx) {
  let index = 0;

  for (let i = 0; i < stepIdx; i++) {
    if (quizStructure[i].type === "block") {
      quizStructure[i].questions.forEach((q) => {
        index += q.answers.length;
      });
    }
  }

  for (let q = 0; q < questionIdx; q++) {
    index += quizStructure[stepIdx].questions[q].answers.length;
  }

  return index + answerIdx + 1;
}
