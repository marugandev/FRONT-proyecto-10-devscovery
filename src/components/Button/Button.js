import "./Button.css";

export const Button = ({
  type = "button",
  textContent,
  id,
  className,
  disabled = false,
  ariaLabel,
  onClick
}) => {
  const btn = document.createElement("button");
  btn.type = type;
  btn.textContent = textContent;

  if (id) btn.id = id;
  if (className) {
    className.split(" ").forEach((c) => {
      btn.classList.add(c);
    });
  }

  btn.disabled = disabled;

  if (ariaLabel) btn.setAttribute("aria-label", ariaLabel);

  if (onClick) btn.addEventListener("click", onClick);

  return btn;
};
