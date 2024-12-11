import { Button } from "../Button/Button";
import { AnchorLink } from "../AnchorLink/AnchorLink";
import "./Header.css";
import { Menu } from "../Menu/Menu";
import { doToggleMenu } from "../../utils/functions/doToggleMenu";
import { Events } from "../../pages/Events/Events";

export const Header = () => {
  const header = document.createElement("header");
  const h1 = document.createElement("h1");
  const a = AnchorLink({
    href: "#"
  });
  const img = document.createElement("img");

  const toggleButton = Button({
    className: "header__button--toggle",
    ariaLabel: "Menu toggle"
  });
  const imgToggleButton = document.createElement("img");

  header.classList.add("header");
  img.src = "/assets/devscovery_logo.svg";
  img.alt = "Logotipo de Devscovery";
  img.classList.add("header__logo");
  imgToggleButton.src = "/assets/icons/devscovery_menu_close.svg";

  h1.addEventListener("click", (e) => {
    e.preventDefault();
    window.history.pushState("", "", "/events");
    Events();
  });
  toggleButton.addEventListener("click", doToggleMenu);

  header.append(h1);
  h1.append(a);
  a.append(img);
  toggleButton.append(imgToggleButton);
  header.append(toggleButton);
  header.append(Menu());

  return header;
};
