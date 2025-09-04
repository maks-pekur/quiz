import { getDeviceType } from "./get-device.js";

let currentBackground = "";

export function applyBackground(step) {
  const wrapper = document.getElementById("wrapper");
  const device = getDeviceType();
  const newImage = `./assets/images/background/${device}/${step.background}`;

  if (newImage === currentBackground) return;
  currentBackground = newImage;

  const img = new Image();
  img.src = newImage;

  img.onload = () => {
    wrapper.style.opacity = 0;
    requestAnimationFrame(() => {
      setTimeout(() => {
        wrapper.style.backgroundImage = `url(${newImage})`;
        wrapper.style.opacity = "1";
      }, 200);
    });
  };
}
