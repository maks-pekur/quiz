const STORAGE_KEY = "quizProgress";

export function saveProgress(stepIndex, questionIndex, selectedIndex) {
  const data = {
    stepIndex,
    questionIndex,
    selectedIndex,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function loadProgress() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.warn("Ошибка при разборе saved progress:", e);
      return null;
    }
  }
  return null;
}

export function clearProgress() {
  localStorage.removeItem(STORAGE_KEY);
}
