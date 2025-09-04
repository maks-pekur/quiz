export function animateAnswersWaterfall(answersElem) {
  const items = answersElem.querySelectorAll(".answer-button");

  items.forEach((item, i) => {
    item.style.opacity = "0";
    item.style.transform = "scale(0.6)";
    item.style.animation = "none";

    void item.offsetWidth;

    setTimeout(() => {
      item.style.animation = `fadeScale 0.5s cubic-bezier(0.25, 1.25, 0.5, 1) forwards`;
    }, i * 150);
  });
}
