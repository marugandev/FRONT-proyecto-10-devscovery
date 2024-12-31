import { removeLocalStorage } from "./removeLocalStorage";
import { verifyToken } from "./userService";

export const listenToTokenChanges = () => {
  window.addEventListener("storage", ({ key, newValue }) => {
    if (key !== "token" && key !== "user") return;
    console.log(`Cambio detectado en localStorage ${key}:`, newValue);

    if (key === "token" && newValue) {
      verifyJwt(newValue);
    } else {
      removeLocalStorage();
      window.location.href = "/";
    }
  });
};

export const verifyJwt = async (token) => {
  try {
    const res = await verifyToken(token);
    if (res.status === "success") {
      console.log("verifyJwt ✅");
    }
  } catch (error) {
    removeLocalStorage();
    window.location.href = "/";

    console.error(error);
  }
};
