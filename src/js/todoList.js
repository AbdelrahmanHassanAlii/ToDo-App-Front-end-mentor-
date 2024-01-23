var root = document.documentElement;

let Buttons = document.querySelectorAll(".button");

Buttons.forEach((button) => {
  button.addEventListener("click", () => {
    button.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" width="11" height="9"><path fill="none" stroke="#FFF" stroke-width="2" d="M1 4.304L3.696 7l6-6"/></svg>';
    button.style.background =
      getComputedStyle(root).getPropertyValue("--check-background");
  });
});
