export let stepIndex = 0;
export let questionIndex = 0;
export const selectedIndex = {};

export function setState(newStep, newQuestion) {
  stepIndex = newStep;
  questionIndex = newQuestion;
}
