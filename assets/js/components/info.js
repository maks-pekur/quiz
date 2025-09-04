export function renderInfo(step, container) {
  const interDiv = document.createElement("div");
  interDiv.className = "info";

  const text = document.createElement("p");
  text.textContent = step.text || "";

  interDiv.appendChild(text);
  container.appendChild(interDiv);
}
