import { Events } from "../../pages/Events/Events";
import { replaceMenu } from "./replaceMenu";
import { setLocalStorage } from "./setLocalStorage";
import { loginService } from "./userService";

export const doLogin = async (e) => {
  const pError = document.querySelector(".auth-section__error");
  pError.innerHTML = "";

  const inputEmail = e.target[1];
  const inputPassword = e.target[3];

  const body = {
    email: inputEmail.value,
    password: inputPassword.value
  };

  try {
    const res = await loginService(body);

    if (res && res.token && res.user) {
      setLocalStorage(res);

      console.log("login ✅");
      replaceMenu();
      Events();
    } else {
      pError.textContent = res.message || "Error desconocido al iniciar sesión";
      console.error(res);
    }
  } catch (error) {
    pError.textContent =
      "Error en la petición al servidor, inténtalo más tarde";
    console.error(error);
  }
};
