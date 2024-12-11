import { Events } from "../../pages/Events/Events";
import { AnchorLink } from "../AnchorLink/AnchorLink";

export const CloseLink = ({ classNameAnchor, classNameDiv, section }) => {
  const divClose = document.createElement("div");
  const aClose = AnchorLink({
    textContent: "X",
    className: classNameAnchor
  });

  divClose.classList.add(classNameDiv);
  divClose.append(aClose);

  aClose.addEventListener("click", (e) => {
    e.preventDefault();
    section.remove();

    window.history.pushState("", "", "/events");
    Events();
    document.removeEventListener("keydown", handleKeydownEsc);
  });

  const handleKeydownEsc = (e) => {
    e.preventDefault();
    if (e.key === "Escape") {
      section.remove();

      window.history.pushState("", "", "/events");
      Events();
      document.removeEventListener("keydown", handleKeydownEsc);
    }
  };

  document.addEventListener("keydown", handleKeydownEsc);

  aClose.focus();

  return divClose;
};
