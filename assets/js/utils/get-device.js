export function getDeviceType() {
  const width = window.innerWidth;
  if (width <= 768) return "mob";
  if (width <= 1024) return "tab";
  return "web";
}
