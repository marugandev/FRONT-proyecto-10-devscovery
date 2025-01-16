import { Events } from "../../pages/Events/Events";
import { replaceMenu } from "./replaceMenu";
import { setLocalStorage } from "./setLocalStorage";
import { loginService } from "./userService";

export const doLogin = async (e) => {
  const pError = document.querySelector(".auth-section__error");
  pError.innerHTML = "";

  const [, inputEmail, , inputPassword] = Array.from(e.target);

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
    }
  } catch (error) {
    pError.textContent =
      error || "Error en la petición al servidor, inténtalo más tarde";
    console.error(error);
  }
};
