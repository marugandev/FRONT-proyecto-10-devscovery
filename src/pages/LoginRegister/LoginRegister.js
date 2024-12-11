import { Login } from "../../components/Login/Login";
import { Register } from "../../components/Register/Register";
import { doLogin } from "../../utils/functions/doLogin";
import { doRegister } from "../../utils/functions/doRegister";
import { moveInputs } from "../../utils/animations/moveInputs";
import { navigate } from "../../utils/functions/navigate";
import { routes } from "../../utils/routes/routes";

import "./LoginRegister.css";

export const LoginRegister = () => {
  const main = document.querySelector("main");
  main.innerHTML = "";

  const section = document.createElement("section");
  section.classList.add("main__auth-section");

  let showLogin = true;

  const renderForm = () => {
    section.innerHTML = "";

    const form = showLogin ? Login() : Register();
    section.append(form);
    main.append(section);

    assignDynamicEventListeners();
    moveInputs();
  };

  const assignDynamicEventListeners = () => {
    const closeLink = section.querySelector(".auth-section__close-link");
    const eventsRoute = routes.find((route) => route.path === "/events");

    if (closeLink && eventsRoute) {
      closeLink.onclick = (e) => {
        section.remove();
        navigate(e, eventsRoute, routes);
      };

      closeLink.onkeydown = (e) => {
        if (e.key === "Escape") {
          section.remove();
          navigate(e, eventsRoute, routes);
        }
      };

      closeLink.focus();
    }

    const registerLink = section.querySelector(".auth-section__register-link");
    const loginLink = section.querySelector(".auth-section__login-link");

    if (registerLink) {
      /*  const registerRoute = routes.find((route) => route.path === "/register");
       */
      registerLink.onclick = (e) => {
        e.preventDefault();
        showLogin = false;
        /*   navigate(e, registerRoute, routes);
        window.history.pushState("", "", registerRoute.path); */
        renderForm();
      };
    }

    if (loginLink) {
      /*   const loginRoute = routes.find((route) => route.path === "/login"); */

      loginLink.onclick = (e) => {
        e.preventDefault();
        showLogin = true;
        /*         navigate(e, loginRoute, routes);
        window.history.pushState("", "", loginRoute.path); */
        renderForm();
      };
    }

    const form = section.querySelector(".auth-section__form");
    if (form) {
      form.onsubmit = (e) => {
        e.preventDefault();
        if (showLogin) {
          doLogin(e);
        } else {
          doRegister(e);
        }
      };
    }
  };

  renderForm();

  return section;
};
