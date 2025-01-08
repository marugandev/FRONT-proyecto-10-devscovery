import "./AlertManagement.css";
import { Button } from "../Button/Button";

export const Alert = ({
  textContent,
  cancelButton = false,
  onAccept,
  onCancel
}) => {
  const main = document.querySelector("main");
  if (!main) {
    console.error("No se encontró el elemento main");
    return;
  }

  const alertOverlay = document.createElement("div");
  alertOverlay.classList.add("alert__overlay");

  const alert = document.createElement("div");
  alert.classList.add("alert");
  alert.setAttribute("role", "alert");

  const p = document.createElement("p");
  p.textContent = textContent;
  alert.append(p);

  if (cancelButton) {
    const buttonsContainer = document.createElement("div");
    buttonsContainer.classList.add("alert__buttons-container");

    const cancelButton = Button({
      textContent: "Cancelar",
      className: "alert__button alert__cancel-button",
      onClick: onCancel
    });

    const acceptButton = Button({
      textContent: "Aceptar",
      className: "alert__button alert__accept-button",
      onClick: onAccept
    });
    buttonsContainer.append(cancelButton, acceptButton);

    alert.append(buttonsContainer);
  } else {
    const acceptButton = Button({
      textContent: "Aceptar",
      className: "alert__button alert__accept-button",
      onClick: onAccept
    });
    alert.append(acceptButton);
  }
  alertOverlay.prepend(alert);
  main.prepend(alertOverlay);
};

export const RemoveAlert = () => {
  const alert = document.querySelector(".alert__overlay");
  if (alert) alert.remove();
};
