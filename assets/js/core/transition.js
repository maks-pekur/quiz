export function startTransition({ callback, delay }) {
  const quizContainer = document.getElementById("quiz");
  const loader = document.getElementById("custom-loader");

  quizContainer.classList.add("fade");
  quizContainer.style.pointerEvents = "none";

  requestAnimationFrame(() => {
    loader.classList.add("show");
  });

  const transitionDelay =
    typeof delay === "number"
      ? delay
      : Math.floor(Math.random() * (4000 - 2700 + 1)) + 2700;

  setTimeout(() => {
    loader.classList.remove("show");
    loader.addEventListener("transitionend", function handler() {
      loader.removeEventListener("transitionend", handler);
      quizContainer.classList.remove("fade");
      quizContainer.style.pointerEvents = "auto";
      callback();
    });
  }, transitionDelay);
}
