import { Events } from "../../pages/Events/Events";
import { replaceMenu } from "./replaceMenu";
import { setLocalStorage } from "./setLocalStorage";
import { registerService } from "./userService";

export const doRegister = async (e) => {
  const pError = document.querySelector(".auth-section__error");
  pError.innerHTML = "";

  const inputUserName = e.target[1];
  const inputEmail = e.target[3];
  const inputPassword = e.target[5];
  const inputRepeatPassword = e.target[7];

  if (inputPassword.value !== inputRepeatPassword.value) {
    pError.textContent = "La contraseña debe coincidir";
    return;
  }

  const body = {
    userName: inputUserName.value,
    email: inputEmail.value,
    password: inputPassword.value
  };

  try {
    const res = await registerService(body);

    if (res && res.token && res.user) {
      setLocalStorage(res);

      console.log("register ✅");
      replaceMenu();
      Events();
    } else {
      pError.textContent = res.message || "Error desconocido al registrarse";
      console.error(res);
    }
  } catch (error) {
    pError.textContent =
      "Error en la petición al servidor, inténtalo más tarde";
    console.error(error);
  }
};
