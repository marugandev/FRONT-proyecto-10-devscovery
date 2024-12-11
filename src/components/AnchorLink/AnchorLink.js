import "./AnchorLink.css";

export const AnchorLink = ({
  textContent,
  href = "#",
  id,
  className,
  target = "_self",
  rel = "noopener norreferer",
  ariaLabel
}) => {
  const a = document.createElement("a");
  a.textContent = textContent;
  a.href = href;

  if (id) a.id = id;
  if (className) {
    className.split(" ").forEach((c) => {
      a.classList.add(c);
    });
  }

  a.target = target;
  a.rel = rel;

  if (ariaLabel) {
    a.setAttribute("aria-label", ariaLabel);
  }

  return a;
};
