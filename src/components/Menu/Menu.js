import { navigate } from "../../utils/functions/navigate";
import { routes } from "../../utils/routes/routes";
import { Button } from "../button/button";
import { Nav } from "../Nav/Nav";

import "./Menu.css";

export const Menu = () => {
  const div = document.createElement("div");
  let button;
  if (localStorage.getItem("user")) {
    const user = JSON.parse(localStorage.getItem("user"));
    const userName = user.userName;
    const userRole = user.role;

    button = Button({
      textContent: userName,
      id: "profile",
      className: "header__button header__button--profile",
      ariaLabel: userName
    });

    if (userRole === "admin") {
      button.textContent += " ★";
      button.classList.add("header__button--profile-admin");
    }

    const profileRoute = routes.find((route) => route.path === "/profile");
    button.addEventListener("click", (e) => {
      if (profileRoute) navigate(e, profileRoute, routes);
    });
  } else {
    button = Button({
      textContent: "Inicia sesión",
      id: "login",
      className: "header__button",
      ariaLabel: "Login"
    });

    const loginRoute = routes.find((route) => route.path === "/login");
    button.addEventListener("click", (e) => {
      if (loginRoute) navigate(e, loginRoute, routes);
    });
  }

  div.classList.add("header__menu");

  div.append(button);
  div.append(Nav());

  return div;
};
