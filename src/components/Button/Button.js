import "./Button.css";

export const Button = ({
  type = "button",
  textContent,
  id,
  className,
  disabled = false,
  ariaLabel
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

  return btn;
};
